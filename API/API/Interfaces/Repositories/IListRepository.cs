using API.Models;

namespace API.Interfaces.Repositories;

public interface IListRepository
{
    Task<List> GetListByIdAsync(long id);
    Task<List<List>> GetListByBoardIdAsync(long id);
    Task<List<List>> GetListsAsync();
    Task<bool> AddListAsync(List list);
    Task<bool> DeleteListAsync(long id);
    Task<bool> UpdateListAsync(List list);
}