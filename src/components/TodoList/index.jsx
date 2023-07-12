import { useTodoList } from '../../contexts/TodoListContext'
import ListItem from '../ListItem'
import './index.css'
import { useEffect, useState } from 'react'

/**
 * TODO List
 */
export default function TodoList() {
  const [inputValue, setInputValue] = useState('')
  const { todoList, error, deleteItem, addItem } = useTodoList()

  //display error message when error is not null
  useEffect(() => {
    if (error === null) return
    alert(error.message)
  }, [error])

  const changeInput = (e) => {
    //set input value to state
    setInputValue(e.target.value)
  }

  const submitInput = (e) => {
    e.preventDefault()
    //display alert on empty task name
    if (inputValue === '') return alert('Please enter a task name')

    //add item to list
    addItem(inputValue)

    //clear input
    setInputValue('')
  }

  return (
    <div className="todolist">
      <h1>TODO LIST</h1>
      <form className="todolist__form" onSubmit={submitInput}>
        <input
          type="text"
          value={inputValue}
          onChange={changeInput}
          placeholder="Task Name"
          name="taskName"
        />
        <button className="submit-button" type="submit">
          Add
        </button>
      </form>
      <div className="todolist__items">
        {todoList.map((item) => {
          return <ListItem item={item} onDelete={deleteItem} key={item.id} />
        })}
      </div>
    </div>
  )
}
