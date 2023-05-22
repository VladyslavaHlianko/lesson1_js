import React from "react";
import Row from "./components/Row";
import "./styles.module.sass";

const Table = ({ todoList, updateStatus, deleteElement, updateElement }) => {
  const [selectAll, setSelectAll] = React.useState(false);

  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
  };

  console.log(todoList);
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
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {todoList && todoList.length
          ? todoList.map((el) => (
              <Row
                key={el.id}
                row={el}
                updateStatus={updateStatus}
                deleteElement={deleteElement}
                updateElement={updateElement}
              />
            ))
          : null}
      </tbody>
    </table>
  );
};

export default Table;