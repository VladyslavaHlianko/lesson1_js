import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const updateElement = (updatedRow) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === updatedRow.id) {
        return { ...todo, title: updatedRow.title, description: updatedRow.description, completed: updatedRow.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteElement = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  
    
  const onAddTodo = (newTodo) => {
    const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = [...existingTodos, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
     <Form onAddTodo={onAddTodo} title={title} description={description} setTitle={setTitle} setDescription={setDescription} />
      <Table elements={todos} updateElement={updateElement} deleteElement={deleteElement} todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
