using GraphQL.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace TimeTrackerApp.Helpers
{
	public class GraphQLUserContext : Dictionary<string, object>, IProvideClaimsPrincipal
	{
		public ClaimsPrincipal User { get; set; } 
		public GraphQLUserContext(ClaimsPrincipal user)
		{
			User = user;
		}
	}
}
