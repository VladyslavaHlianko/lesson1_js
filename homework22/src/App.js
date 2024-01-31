import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Form from "./components/Form";
import API from "./services/api";
import Buttons from "./components/Buttons";

function App() {
  const [state, setState] = useState({
    todos: [],
    listToRender: [],
    filter: "all",
  });

  const updateElement = async (updatedElement) => {
    try {
      await API.updateTodos(
        updatedElement.title,
        updatedElement.description,
        updatedElement.completed,
        updatedElement.id
      );
      console.log("Дані оновлені на сервері");

      setState((prevState) => {
        const updatedTodos = prevState.todos.map((todo) => {
          if (todo.id === updatedElement.id) {
            return updatedElement;
          } else {
            return todo;
          }
        });

        return {
          ...prevState,
          todos: updatedTodos,
          listToRender: updatedTodos,
        };
      });
    } catch (error) {
      console.log("Помилка при оновленні даних на сервері", error);
    }
  };

  const updateListToRender = (filter) => {
    setState((prevState) => {
      const { todos } = prevState;

      let updatedList = [];
      if (filter === "pending") {
        updatedList = todos.filter((todo) => !todo.completed);
      } else if (filter === "completed") {
        updatedList = todos.filter((todo) => todo.completed);
      } else {
        updatedList = todos;
      }

      return {
        ...prevState,
        listToRender: updatedList,
      };
    });
  };

  const updateStatus = async (element) => {
    const updatedTodos = state.todos.map((todo) => {
      if (todo.id === element.id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });

    setState((prevState) => ({
      ...prevState,
      todos: updatedTodos,
    }));

    try {
      await API.updateStatus(element);
      console.log("Дані оновлені на сервері");
      await fetchTodos();
      await updateListToRender(state.filter);
    } catch (error) {
      console.log("Помилка при оновленні даних на сервері", error);
    }
  };

  const createTitle = (title, description, completed) => {
    const { filter } = state;
    const newTodo = {
      title,
      description,
      completed: filter === "completed",
    };

    API.createTitle(newTodo.title, newTodo.description, newTodo.completed).then(
      (res) => {
        setState((prevState) => ({
          todos: [...prevState.todos, res],
          listToRender: [...prevState.listToRender, res],
        }));
      }
    );
  };

  const fetchTodos = async () => {
    try {
      const todos = await API.getTodos();
      setState((prevState) => ({ ...prevState, todos }));
      updateListToRender(state.filter);
      console.log("Список задач отримано з сервера");
    } catch (error) {
      console.log("Помилка при отриманні списку задач з сервера", error);
    }
  };

  const deleteElement = async (id) => {
    await API.deleteTodods(id);
    fetchTodos();
    updateListToRender(state.filter);
  };

  const handleSetFilter = (filter) => {
    setState((prevState) => ({
      ...prevState,
      filter: filter,
    }));
    updateListToRender(filter);
  };

  useEffect(() => {
    API.getTodos().then((data) => {
      setState((prevState) => ({
        ...prevState,
        todos: data,
      }));
      updateListToRender();
    });
  }, []);

  return (
    <div className="App">
      <Form createTitle={createTitle} />
      <Buttons handleSetFilter={handleSetFilter} />
      <Table
        todoList={state.listToRender}
        updateStatus={updateStatus}
        deleteElement={deleteElement}
        updateElement={updateElement}
      />
    </div>
  );
}

export default App;
