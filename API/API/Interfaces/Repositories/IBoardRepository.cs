using API.Models;

namespace API.Interfaces.Repositories;

public interface IBoardRepository
{
    Task<Board> GetBoardByIdAsync(long id);
    Task<List<Board>> GetBoardsByTeamIdAsync(string teamName);
    Task<List<Board>> GetBoardsAsync();
    Task<bool> AddBoardAsync(Board board);
    Task<bool> DeleteBoardAsync(long id);
    Task<bool> UpdateBoardAsync(Board board);
}