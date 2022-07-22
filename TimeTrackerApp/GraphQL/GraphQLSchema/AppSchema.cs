using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using System;
using ToDoList_task.GraphQL.GraphQLQueries;

namespace ToDoList_task.GraphQL.GraphQLSchema
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
