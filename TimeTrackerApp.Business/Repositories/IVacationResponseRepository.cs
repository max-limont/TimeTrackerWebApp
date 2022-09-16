using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories;

public interface IVacationResponseRepository
{
    public Task<VacationResponse> GetVacationResponses();
    public Task<VacationResponse> GetVacationResponseById(int id);
    public Task<VacationResponse> GetVacationResponsesByUserId(int userId);
    public Task<VacationResponse?>  GetVacationResponseByVacationId(int vacationId);
    public Task<VacationResponse> CreateVacationResponse(VacationResponse vacationResponse);
    public Task<VacationResponse> RemoveVacationResponse(int id);
    public Task<VacationResponse?> RemoveVacationResponseByVacationId(int id);

    public Task<VacationResponse> UpdateVacationResponse(VacationResponse vacationResponse);
}