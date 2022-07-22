using GraphQL.Types;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
	public class RecordType : ObjectGraphType<Record>
    {
        public RecordType()
        {
            Field(x => x.Id, type: typeof(IdGraphType));
            Field(x => x.WorkingTime);
            Field(x => x.Comment, nullable: true);
            Field(x => x.CreatorId);
            Field(x => x.EditorId, nullable: true);
            Field(x => x.CreatedAt);
        }
    }
}
