using API.DTO.Board;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Services;

public class BoardService
{
    private readonly IBoardRepository _boardRepository;

    public BoardService(IBoardRepository boardRepository)
    {
        _boardRepository = boardRepository;
    }

    public async Task<Board> GetBoardByIdAsync(long id)
    {
        return await _boardRepository.GetBoardByIdAsync(id);
    }
    
    public async Task<List<Board>> GetBoardsByTeamIdAsync(long id)
    {
        return await _boardRepository.GetBoardsByTeamIdAsync(id);
    }
    
    public async Task<List<Board>> GetBoardsAsync()
    {
        return await _boardRepository.GetBoardsAsync();
    }

    public async Task<bool> AddBoardAsync(BoardDto board)
    {
        Board b = new Board();
        b.BoardTitle = board.BoardTitle;
        b.TeamId = board.TeamId;
        
        return await _boardRepository.AddBoardAsync(b);
    }

    public async Task<bool> DeleteBoardAsync(long id)
    {
        return await _boardRepository.DeleteBoardAsync(id);
    }

    public async Task<bool> UpdateBoardAsync(long id, UpdateBoardDto board)
    {
        Board b = await _boardRepository.GetBoardByIdAsync(id);
        if (b == null)
        {
            return false;
        }

        b.BoardTitle = board.BoardTitle;
        return await _boardRepository.UpdateBoardAsync(b);
    }
}