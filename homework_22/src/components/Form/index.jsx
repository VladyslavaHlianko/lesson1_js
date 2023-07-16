import React, { useState } from "react";
import Input from "./components/Input";
import Button from "../common/Button";
import "./style.sass";

export default function Form({ createTitle }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const updateTitle = (value) => {
    setTitle(value);
  };
  const updateDescription = (value) => {
    setDescription(value);
  };

  const create = () => {
    createTitle(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <h1 className="main-title">Todo Application</h1>
      <div className="fromWrapper">
        <Input
          updateTitle={updateTitle}
          updateDescription={updateDescription}
          title={title}
          description={description}
        />
        <Button action={create} text="Create Todo" />
      </div>
    </>
  );
}
