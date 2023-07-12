import { renderHook, act } from '@testing-library/react-hooks'
import { useTodoList, TodoListProvider } from '../TodoListContext'

const wrapper = ({ children }) => (
  <TodoListProvider>{children}</TodoListProvider>
)

describe('TodoListContext', () => {
  it('should render correctly', () => {
    //render(<TodoListProvider />)
    const { result } = renderHook(() => useTodoList(), {
      wrapper,
    })
    expect(result.current.todoList).toEqual([])
  })

  it('should add item to list', async () => {
    const { result } = renderHook(() => useTodoList(), {
      wrapper,
    })

    //mock fetch api to return data
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: '1', title: 'New Task' }]),
      }),
    )
    await act(async () => {
      await result.current.addItem('New Task')
    })
    expect(result.current.todoList).toEqual([{ id: '1', title: 'New Task' }])
  })

  it('should catch error on add item', async () => {
    const { result } = renderHook(() => useTodoList(), {
      wrapper,
    })
    //mock fetch api to throw error
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        message: 'error',
      }),
    )
    await act(async () => {
      await result.current.addItem('New Task')
    })
    expect(result.current.todoList).toEqual([])
  })

  it('should delete item from list', async () => {
    const { result } = renderHook(() => useTodoList(), {
      wrapper,
    })
    //mock fetch api to return empty data
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      }),
    )
    await act(async () => {
      await result.current.deleteItem('1')
    })
    expect(result.current.todoList).toEqual([])
  })

  it('should catch error on delete item', async () => {
    const { result } = renderHook(() => useTodoList(), {
      wrapper,
    })
    //mock fetch api to throw error
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        message: 'error',
      }),
    )
    await act(async () => {
      await result.current.deleteItem('1')
    })
    expect(result.current.todoList).toEqual([])
  })

  it('should throw error when no context', () => {
    //render hook without provider
    const { result } = renderHook(() => useTodoList())
    expect(result.error).toEqual(
      Error('useTodoList must be used within a TodoListProvider'),
    )
  })
})
