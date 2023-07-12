class TodoListService {
  //get todo list from server
  getTodoList() {
    return fetch('http://localhost:3001/tasks', {
      method: 'GET',
    })
  }

  //add todo list item to server
  addItem(data) {
    return fetch('http://localhost:3001/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  //delete todo list item from server
  deleteItem(id) {
    return fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })
  }
}

export default new TodoListService()
