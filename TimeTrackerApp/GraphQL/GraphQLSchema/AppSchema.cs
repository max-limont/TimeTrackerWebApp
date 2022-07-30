using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using System;
using TimeTrackerApp.GraphQL.GraphQLQueries;

namespace TimeTrackerApp.GraphQL.GraphQLSchema
{
    public class AppSchema : Schema
    {
        public AppSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<AppQuery>();
            Mutation = provider.GetRequiredService<AppMutation>();
        }
    }
}
