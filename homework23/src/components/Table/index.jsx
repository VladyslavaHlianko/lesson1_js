import React, { useState } from "react";
import Row from "./components/Row";
import './style.module.sass'

const Table = ({ elements, updateElement, deleteElement, setTodos }) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
  };

  return (
    <table>
      <tbody>
        <tr className="row">
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        {elements.map((row) => (
          <Row
            key={row.id}
            row={row}
            todos={elements}
            updateElement={updateElement}
            deleteElement={deleteElement}
            setTodos={setTodos}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
