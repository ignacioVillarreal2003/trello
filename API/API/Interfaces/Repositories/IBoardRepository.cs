using API.Models;

namespace API.Interfaces.Repositories;

public interface IBoardRepository
{
    Task<Board> GetBoardByIdAsync(long id);
    Task<List<Board>> GetBoardsByTeamIdAsync(long id);
    Task<List<Board>> GetBoardsAsync();
    Task<bool> AddBoardAsync(Board board);
    Task<bool> DeleteBoardAsync(long id);
    Task<bool> UpdateBoardAsync(Board board);
}