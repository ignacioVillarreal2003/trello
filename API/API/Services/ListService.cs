using API.DTO.List;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Services;

public class ListService
{
    private readonly IListRepository _listRepository;

    public ListService(IListRepository listRepository)
    {
        _listRepository = listRepository;
    }
    
    public async Task<List<List>> GetListsAsync(long boardId)
    {
        return await _listRepository.GetListByBoardIdAsync(boardId);
    }

    public async Task<bool> AddListAsync(ListDto list)
    {
        List l = new List();
        l.BoardId = list.BoardId;
        l.ListTitle = list.ListTitle;
        
        return await _listRepository.AddListAsync(l);
    }

    public async Task<bool> DeleteListAsync(long id)
    {
        return await _listRepository.DeleteListAsync(id);
    }

    public async Task<bool> UpdateListAsync(long id, UpdateListDto list)
    {
        List l = await _listRepository.GetListByIdAsync(id);
        if (l == null)
        {
            return false;
        }

        l.ListTitle = list.ListTitle;
        return await _listRepository.UpdateListAsync(l);
    }
}