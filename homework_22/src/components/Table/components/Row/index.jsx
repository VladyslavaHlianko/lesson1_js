import React from "react";
import Button from "../../../common/Button";
import "./style.css";

const Row = ({ row, updateStatus, deleteElement, updateElement }) => {
  const [completed, setCompleted] = React.useState(row.completed);
  const [title, setTitle] = React.useState(row.title);
  const [description, setDescription] = React.useState(row.description);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    const updatedElement = { ...row, title, description, completed };
    updateElement(updatedElement);
  };

  const handleUpdateStatus = () => {
    setCompleted(!completed);
    updateStatus({ ...row, completed: completed });
  };

  const handleDelete = () => {
    deleteElement(row.id);
  };

  return (
    <tr className="row">
      <td>
        <input
          type="checkbox"
          onChange={handleUpdateStatus}
          checked={completed}
        />
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
            <Button
              color="green"
              text="Completed"
              action={handleUpdateStatus}
            />
          </div>
        ) : (
          <div>
            <Button color="red" text="Pending" action={handleUpdateStatus} />
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