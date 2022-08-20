using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories;

public interface ITeamRepository
{
    public Task<List<Team>> GetTeams();
    public Task<Team> GetTeamById(int id);
    public Task<Team> UpdateTeam(Team team);
    public Task<Team>  DeleteTeam(int id);
    public Task<Team>  CreateTeam(Team team);
}