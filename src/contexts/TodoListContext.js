import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import PropType from 'prop-types'
import TodoListService from '../services/TodoListService'

TodoListProvider.propTypes = {
  children: PropType.node,
}

const TodoListContext = createContext()

export function TodoListProvider({ children }) {
  const [todoList, setTodoList] = useState([])
  const [error, setError] = useState(null)

  //get todo list data from api
  const getTodoList = async () => {
    setError(null)
    try {
      const response = await TodoListService.getTodoList()
      const data = await response.json()
      setTodoList(data)
    } catch (error) {
      setError(error)
    }
  }

  //get todo list data on first load
  useEffect(() => {
    getTodoList()
  }, [])

  //delete item from todo list
  const deleteItem = useCallback(async (id) => {
    setError(null)
    try {
      await TodoListService.deleteItem(id).then(() => {
        getTodoList()
      })
    } catch (error) {
      setError(error)
    }
  }, [])

  //add item to todo list
  const addItem = useCallback(async (val) => {
    const data = { title: val }
    setError(null)
    try {
      await TodoListService.addItem(data).then(() => {
        getTodoList()
      })
    } catch (error) {
      setError(error)
    }
  }, [])

  //memoize context value
  const providerValue = useMemo(
    () => ({
      todoList,
      error,
      deleteItem,
      addItem,
    }),
    [todoList, error, deleteItem, addItem],
  )

  return (
    <TodoListContext.Provider value={providerValue}>
      {children}
    </TodoListContext.Provider>
  )
}

//custom hook to use todo list context
export function useTodoList() {
  const context = useContext(TodoListContext)
  if (!context) {
    throw new Error('useTodoList must be used within a TodoListProvider')
  }
  return context
}

export default TodoListContext
