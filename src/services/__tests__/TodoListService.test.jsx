import TodoListService from '../TodoListService'

describe('TodoListService', () => {
  it('should call fetch with correct url when call getTodoList', () => {
    //mock fetch function
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: '1', title: 'New Task' }]),
      }),
    )
    TodoListService.getTodoList()
    expect(global.fetch).toBeCalledWith('http://localhost:3001/tasks', {
      method: 'GET',
    })
  })

  it('should call fetch with correct url when call addItem', () => {
    //mock fetch function
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: '1', title: 'New Task' }),
      }),
    )
    TodoListService.addItem({ title: 'New Task' })
    expect(global.fetch).toBeCalledWith('http://localhost:3001/tasks', {
      method: 'POST',
      body: JSON.stringify({ title: 'New Task' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })

  it('should call fetch with correct url when call deleteItem', () => {
    //mock fetch function
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      }),
    )
    TodoListService.deleteItem('1')
    expect(global.fetch).toBeCalledWith('http://localhost:3001/tasks/1', {
      method: 'DELETE',
    })
  })
})
