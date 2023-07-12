import { render, screen, fireEvent } from '@testing-library/react'
import TodoList from '../TodoList'
import TodoListContext, {
  TodoListProvider,
} from '../../contexts/TodoListContext'

describe('TodoList', () => {
  it('should render correctly', () => {
    render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>,
    )
    expect(screen.getByText('TODO LIST')).toBeInTheDocument()
  })
  it('should add item to list', () => {
    render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>,
    )
    const input = screen.getByPlaceholderText('Task Name')
    const button = screen.getByText('Add')
    fireEvent.change(input, { target: { value: 'New Task' } })
    fireEvent.click(button)
    expect(input.value).toBe('')
  })
  it('should display alert on error', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    const mockContext = {
      todoList: [],
      error: { message: 'error' },
      addItem: jest.fn(),
      deleteItem: jest.fn(),
    }
    render(
      <TodoListContext.Provider value={mockContext}>
        <TodoList />
      </TodoListContext.Provider>,
    )
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
  it('should display todo list', () => {
    const mockContext = {
      todoList: [{ id: '1', title: 'New Task' }],
      error: null,
      addItem: jest.fn(),
      deleteItem: jest.fn(),
    }
    render(
      <TodoListContext.Provider value={mockContext}>
        <TodoList />
      </TodoListContext.Provider>,
    )
    expect(screen.getByText('New Task')).toBeInTheDocument()
  })
  it('should alert when empty task name', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>,
    )
    const button = screen.getByText('Add')
    fireEvent.click(button)
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
})
