import React from "react";
import "./style.sass";

export default function Input({
  updateTitle,
  updateDescription,
  title,
  description,
}) {
  return (
    <>
      <input
        className="title"
        placeholder="Todo Title"
        type="text"
        value={title}
        onChange={(e) => updateTitle(e.target.value)}
      />
      <input
        className="title"
        placeholder="Description"
        type="text"
        value={description}
        onChange={(e) => updateDescription(e.target.value)}
      />
    </>
  );
}
