import TodoList from './components/TodoList'
import './App.css'
import { TodoListProvider } from './contexts/TodoListContext'

export default function App() {
  return (
    <div className="App">
      <div className="App-container">
        <TodoListProvider>
          <TodoList />
        </TodoListProvider>
      </div>
    </div>
  )
}
