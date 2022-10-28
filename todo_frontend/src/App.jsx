import { useState, useRef, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { AiOutlinePlus } from 'react-icons/ai'
import TodoList from './TodoList';

export default function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const refresh = () => {
      fetch('api/?format=json')
        .then(res => res.json())
        .then(res => setTodos(res))
    }
    refresh()
    setInterval(refresh, 1000)
  }, [])

  const addTodo = useRef();

  function handleAddTodo() {
    const name = addTodo.current.value;
    if (name === "") {
      return
    }
    let id = todos
      .map(({ id }) => id)
      .reduce((pre, cur) => cur > pre ? cur : pre, 0)
    id++
    const todo = {
      id,
      name,
      checked: false
    }

    addTodo.current.value = null

    fetch(`api/${todo.id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo),
    })
      .then(res => res.json())
      .then(res => setTodos(res))
  }

  function checkTodo(todoId) {
    const newTodos = [...todos]
    const target = newTodos.find(({ id }) => todoId === id)
    target.checked = !target.checked

    fetch(`api/${todoId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(target),
    })
      .then(res => res.json())
      .then(res => setTodos(res))
  }

  function deleteTodo(todoId) {
    fetch(`api/${todoId}/`, { method: 'DELETE' })
      .then(res => res.json())
      .then(res => setTodos(res))
  }

  function editTodo(todoId, newName) {
    let newTodos = [...todos]
    const target = newTodos.find(({ id }) => todoId === id)
    target.name = newName

    fetch(`api/${todoId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(target),
    })
      .then(res => res.json())
      .then(res => setTodos(res))
  }

  function handleClearCkecked() {
    setTodos(oldTodos => {
      return oldTodos.filter(({ checked, id }) => {
        if (checked) {
          fetch(`api/${id}/`, { method: 'DELETE' })
        }
        return !checked
      })
    })
  }

  return (
    <>
      <h1>There are {todos.filter(({ checked }) => !checked).length} tasks left todo!</h1>

      <InputGroup>
        <Form.Control
          ref={addTodo}
          type="text"
          maxLength={255}
        />

        <Button variant="secondary" onClick={handleAddTodo}>
          <AiOutlinePlus />
        </Button>
      </InputGroup>

      <Button
        onClick={handleClearCkecked}
        className="clear-btn w-100"
        variant="info"
      >
        Clear Checked
      </Button>

      <TodoList
        todos={todos}
        actions={{ checkTodo, deleteTodo, editTodo }}
      />
    </>
  );
}
