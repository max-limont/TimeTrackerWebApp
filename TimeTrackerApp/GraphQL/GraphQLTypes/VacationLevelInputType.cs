using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class VacationLevelInputType:InputObjectGraphType<VacationLevel>
    {
        public VacationLevelInputType()
        {
            Field<IdGraphType, int?>().Name("Id").Resolve(context => context.Source.Id);
            Field<IntGraphType, int?>().Name("Value").Resolve(context => context.Source.Value);
            Field<StringGraphType, string>().Name("NameLevel").Resolve(context => context.Source.NameLevel);
        }
    }
}
