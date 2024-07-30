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
    
    public async Task<List<Board>> GetBoardsAsync(string teamName) 
    {
        return await _boardRepository.GetBoardsByTeamIdAsync(teamName);
    } // FUNCIONA
    
    public async Task<bool> AddBoardAsync(BoardDto board)
    {
        Board b = new Board();
        b.BoardTitle = board.BoardTitle;
        b.TeamName = board.TeamName;
        b.Theme = board.Theme;
        
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

        if (board.BoardTitle.Length > 0)
        {
            b.BoardTitle = board.BoardTitle;
        }
        
        if (board.Theme.Length > 0)
        {
            b.Theme = board.Theme;
        }
        
        return await _boardRepository.UpdateBoardAsync(b);
    }
}