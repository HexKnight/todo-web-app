import { Button, Form, InputGroup, } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiFillDelete, AiOutlineMore } from 'react-icons/ai'
import { IoMdDoneAll } from 'react-icons/io'

export default function Todo({ todo: { id, name, checked }, actions: { checkTodo, deleteTodo, editTodo } }) {

  const [isEditing, setEditing] = useState(false)

  const [editText, setEditText] = useState(name)

  const [isMore, setMore] = useState(false)

  function handleCheck() {
    checkTodo(id)
  }

  function handleDelete() {
    deleteTodo(id)
  }

  function handleEditDone() {
    if (editText === "") {
      return
    }
    editTodo(id, editText)
    setEditing(false)
  }

  return (
    <InputGroup className="todo-item" >
      {isEditing ?
        <>
          <Form.Control autoFocus onChange={(e) => setEditText(e.target.value)} value={editText} />

          <Button
            onClick={handleEditDone}
            variant="success" >
            <IoMdDoneAll />
          </Button>
        </>
        :
        <>
          <InputGroup.Checkbox
            className="checkbox"
            checked={checked}
            onChange={handleCheck} />
          <InputGroup.Text className="todo-text">{name}</InputGroup.Text>

          {isMore && (
            <>
              <Button
                onClick={() => setEditing(true)}
                variant="warning"
              >
                <AiFillEdit />
              </Button>

              <Button
                onClick={handleDelete}
                variant="danger"
              >
                <AiFillDelete />
              </Button>
            </>
          )}
          <Button
            onBlur={() => setTimeout(() => setMore(false), 0)}
            onClick={() => setMore(isMore ? false : true)}
          >
            <AiOutlineMore />
          </Button>


        </>
      }
    </InputGroup>
  )
}
