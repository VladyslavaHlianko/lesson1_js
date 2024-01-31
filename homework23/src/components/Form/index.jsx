import React, { useState } from "react";
import "./style.sass";
import Button from "../Table/components/Button";

const Form = ({ onAddTodo, title, description, setTitle, setDescription }) => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
  
    const handleTitleChange = (event) => {
      setInputTitle(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setInputDescription(event.target.value);
    };
  
    const handleCreateTodo = () => {
      if (inputTitle && inputDescription) {
        const newTodo = { id: Date.now(), title: inputTitle, description: inputDescription, completed: false };
        onAddTodo(newTodo);
        setInputTitle("");
        setInputDescription("");
      }
    };
  
    return (
      <>
        <h1 className="main-title">Todo Application</h1>
        <div className="fromWrapper">
          <input
              className="title"
              type="text"
              value={inputTitle}
              onChange={handleTitleChange}
              placeholder="Title"
          />
          <input
              className="title"
              type="text"
              value={inputDescription}
              onChange={handleDescriptionChange}
              placeholder="Description"
          />
          <Button text="Create" action={handleCreateTodo} />
        </div>
      </>
    );
  };
  
  export default Form;
  