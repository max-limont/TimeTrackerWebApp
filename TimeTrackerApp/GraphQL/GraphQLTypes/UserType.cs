using GraphQL.Types;

namespace ToDoList_task.GraphQL.GraphQLTypes
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Field(x => x.Id, type: typeof(IdGraphType));
            Field(x => x.Email);
            Field(x => x.Password);
            Field(x => x.FirstName, nullable: true);
            Field(x => x.LastName, nullable: true);
            Field(x => x.WeeklyWorkingTime);
            Field(x => x.RemainingVacationDays);
            Field(x => x.PrivilegesValue);
        }
    }
}
