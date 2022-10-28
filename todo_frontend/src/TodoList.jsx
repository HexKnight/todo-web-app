import { ListGroup } from "react-bootstrap";
import Todo from './Todo'

export default function TodoList({ todos, actions }) {
  return (
    <ListGroup className="todo-list">
      {todos.reverse().map((todo) => <Todo key={todo.id} todo={todo} actions={actions} />)}
    </ListGroup>
  );
}
