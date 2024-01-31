import React, { useState } from "react";
import Button from "../Button";
import "./style.sass";
const Row = ({ row, todos, updateElement, deleteElement, setTodos }) => {
    const [title, setTitle] = useState(row.title);
    const [description, setDescription] = useState(row.description);
    const [isEditing, setIsEditing] = useState(false);
    const [completed, setCompleted] = useState(row.completed);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = () => {
      setIsEditing(false);
      const updatedElement = { ...row, title, description };
      updateElement(updatedElement);
      const updatedTodos = todos.map((todo) => {
        if (todo.id === row.id) {
          return updatedElement;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    };
  
    const handleMark = () => {
      const updatedElement = { ...row, completed: !completed };
      updateElement(updatedElement);
      setCompleted(!completed);
      const updatedTodos = todos.map((todo) => {
        if (todo.id === row.id) {
          return updatedElement;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    };
  
    const handleDelete = () => {
      deleteElement(row.id);
    };
   
    return (
      <tr className="row">
        <td>
          <input type="checkbox" checked={completed}  onChange={handleMark} />
        </td>
        <td>
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <div>{row.title}</div>
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <div>{row.description}</div>
          )}
        </td>
        <td>
          {completed ? (
            <div>
              <Button color="green" text="Completed" action={handleMark} />
            </div>
          ) : (
            <div>
              <Button color="red" text="Pending" action={handleMark} />
            </div>
          )}
        </td>
        <td>
          {isEditing ? (
            <Button text="Save" action={handleSave} />
          ) : (
            <Button text="Edit" action={handleEdit} />
          )}
          <Button color="red" text="Delete" action={handleDelete} />
        </td>
      </tr>
    );
  };
  
  export default Row;
  