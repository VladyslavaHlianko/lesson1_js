const API = {
  getTodos: async (setState) => {
    return await fetch("https://61498bf2035b3600175ba32f.mockapi.io/todo").then(
      (res) => res.json()
    );
  },

  updateStatus: async (element) => {
    return await fetch(
      `https://61498bf2035b3600175ba32f.mockapi.io/todo/${element.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ completed: !element.completed }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => res.json());
  },

  updateTodos: async (title, description, completed, id) => {
    const requestBody = { title, description, completed };

    return await fetch(
      `https://61498bf2035b3600175ba32f.mockapi.io/todo/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => res.json());
  },

  deleteTodods: async (id) => {
    return await fetch(
      `https://61498bf2035b3600175ba32f.mockapi.io/todo/${id}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());
  },

  createTitle: async (title, description, completed) => {
    return await fetch(`https://61498bf2035b3600175ba32f.mockapi.io/todo`, {
      method: "POST",
      body: JSON.stringify({ title, description, completed }),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json());
  },
};

export default API;
