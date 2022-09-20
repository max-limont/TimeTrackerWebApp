using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Services;
using Dapper;

namespace TimeTrackerApp.MsSql.Repositories
{
    public class VacationRepository : IVacationRepository
    {
        private readonly string connectionString;
        private IUserManagement UserManagement { get; set; }
        private IVacationResponseRepository VacationResponseRepository { get; set; }

        public VacationRepository(IConfiguration configuration, IUserManagement userManagement,
            IVacationResponseRepository vacationResponseRepository)
        {
            this.connectionString = configuration.GetConnectionString("MsSqlAzure");
            UserManagement = userManagement;
            this.VacationResponseRepository = vacationResponseRepository;
        }

        public async Task<Vacation> CreateAsync(Vacation vacation)
        {
            string query = @"INSERT INTO Vacation (UserId, StartingTime, EndingTime, Comment) 
              VALUES (@UserId, @StartingTime, @EndingTime, @Comment) select  @@IDENTITY";
            /*1 в запросе должен быть юзер который по дефолту будеть иметь доступ*/

            using (var connection = new SqlConnection(connectionString))
            {
                // string dateBlock = @$"select * from Vacation where StartingTime
                //  between @StartingTime  and @EndingTime or EndingTime between @StartingTime  and @EndingTime  and IsAccepted=1";
                // // var vacationToday = await connection.QueryFirstAsync<Vacation>(dateBlock, vacation);
                // // if (vacationToday == null)
                // // {
                    string queryFetchManagersUser = @$"Select UserId from VacationManager";
                    int id = await connection.QueryFirstAsync<int>(query, vacation);
                    if (id != 0)
                    {
                        var userManagers = await UserManagement.GetByUserIdVacationManagment(vacation.UserId);
                        if (userManagers == null)
                        {
                            var defaultManagersId = await connection.QueryAsync<int>(queryFetchManagersUser);
                            foreach (var managerId in defaultManagersId)
                            {
                                var model = await UserManagement.CreateVacationManagment(new VacationManagement()
                                {
                                    ManagerId = managerId,
                                    EmployeeId = vacation.UserId
                                });
                            }
                        }

                        return await GetVacationByIdAsync(id);
                    }

                    throw new Exception("Vacation create error!");
                }
            // }
            // throw new Exception("Vacation create error!");
        }


        public async Task<Vacation> EditAsync(Vacation vacation)
        {
            string query =
                @"UPDATE Vacation SET UserId = @UserId,IsAccepted=@IsAccepted, StartingTime = @StartingTime, EndingTime = @EndingTime, Comment = @Comment WHERE Id = @Id";

            using (var connection = new SqlConnection(connectionString))
            {
                int result = await connection.ExecuteAsync(query, vacation);
                if (result > 0)
                {
                    return await GetVacationByIdAsync(vacation.Id);
                }

                throw new Exception("Vacation request editing error!");
            }
        }

        public async Task<List<Vacation>> FetchAllAsync()
        {
            string query = @"SELECT * FROM Vacation";
            using (var connection = new SqlConnection(connectionString))
            {
                return (await connection.QueryAsync<Vacation>(query)).ToList();
            }
        }

        public async Task<Vacation> ChangeAcceptedState(VacationResponse response, bool stateAccept)
        {
            string query = @"Update Vacation set IsAccepted=@StateAccepted Where Id=@Id";
            using (var connection = new SqlConnection(connectionString))
            {
                int result = await connection.ExecuteAsync(query,
                    new { Id = response.VacationId, StateAccepted = stateAccept });
                if (result == 0)
                {
                    throw new Exception();
                }

                var model = await VacationResponseRepository.CreateVacationResponse(response);
                return await GetVacationByIdAsync(response.VacationId);
            }
        }

        public async Task<List<User>> GetVacationApprovers(int userId)
        {
            string getVacationApprovers = @$"select * from Users as u Inner join UserManagement 
                        as v on u.Id = v.ManagerId and v.EmployeeId = {userId}";

            using (var connection = new SqlConnection(connectionString))
            {
                var approvers = await connection.QueryAsync<User>(getVacationApprovers);
                return approvers.ToList();
            }
        }

        public async Task<IEnumerable<Vacation>> FetchAllUserVacationAsync(int userId)
        {
            string query = @"SELECT * FROM Vacation WHERE UserId = @UserId";
            using (var connection = new SqlConnection(connectionString))
            {
                var vacations = await connection.QueryAsync<Vacation>(query, new { UserId = userId });
                var approvers = await GetVacationApprovers(userId);
                if (vacations != null)
                {
                    foreach (var vacation in vacations)
                    {
                        vacation.ApproveUsers = approvers.ToList();
                        if (vacation.IsAccepted != null)
                        {
                            vacation.VacationResponse =
                                await VacationResponseRepository.GetVacationResponseByVacationId(vacation.Id);
                        }
                    }

                    return vacations;
                }

                throw new Exception();
            }
        }

        public async Task<Vacation> GetVacationByIdAsync(int id)
        {
            string query = @$"Select * from Vacation as v inner join Users as u on   v.UserId = u.Id
            and v.Id={id}";
            using (var connection = new SqlConnection(connectionString))
            {
                var vacations = await connection.QueryAsync<Vacation, User, Vacation>(query,
                    (v, u) =>
                    {
                        v.User = u;
                        return v;
                    }, splitOn: "Id");
                if (vacations is not null)
                {
                    var vacation = vacations.First();
                    vacation.ApproveUsers = await GetVacationApprovers(vacation.UserId);
                    vacation.VacationResponse = await VacationResponseRepository.GetVacationResponseByVacationId(vacation.Id);
                    return vacation;
                }

                throw new Exception("This vacation was not found");
            }
        }

        public async Task<List<Vacation>> GetRequestVacation(int receiverUserId)
        {
            string query = @$"Select * from Vacation as v inner join Users as u on   v.UserId = u.Id
            and u.Id in (Select EmployeeId from UserManagement where ManagerId={receiverUserId}) and v.IsAccepted is null";

            using (var connection = new SqlConnection(connectionString))
            {
                var listVacation = await connection.QueryAsync<Vacation, User, Vacation>(query, (v, u) =>
                    {
                        v.User = u;
                        return v;
                    },
                    splitOn: "Id");

                if (listVacation != null)
                {
                    return listVacation.ToList();
                }

                throw new Exception("error to fetch");
            }
        }

        public async Task<Vacation> RemoveAsync(int id)
        {
            string query = @"DELETE FROM Vacation WHERE Id = @Id";

            using (var connection = new SqlConnection(connectionString))
            {
                var vacationRequest = await GetVacationByIdAsync(id);
                int affectedRows = await connection.ExecuteAsync(query, new { Id = id });
                if (affectedRows > 0)
                {
                    return vacationRequest;
                }

                throw new Exception("Vacation request removal error!");
            }
        }
    }
}