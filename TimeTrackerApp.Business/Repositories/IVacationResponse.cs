using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories;

public interface IVacationResponse
{
    public Task<VacationResponse> GetVacationResponses();
    public Task<VacationResponse> GetVacationResponseById(int id);
    public Task<VacationResponse> GetVacationResponsesByUserId(int userId);
    public Task<List<VacationResponse>>  GetVacationResponsesByVacationId(int vacationId);
    public Task<VacationResponse> CreateVacationResponse(VacationResponse vacationResponse, bool state);
    public Task<VacationResponse> RemoveVacationResponse(int id);
    public Task<VacationResponse> UpdateVacationResponse(VacationResponse vacationResponse);
}