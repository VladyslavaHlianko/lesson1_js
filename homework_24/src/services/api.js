const API = {
  getUsers: async () => {
    return await fetch("https://634e9f834af5fdff3a625f84.mockapi.io/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Помилка отримання користувачів:", error);
        throw error;
      });
  },

  getProducts: async () => {
    return await fetch("https://634e9f834af5fdff3a625f84.mockapi.io/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Помилка отримання товарів:", error);
        throw error;
      });
  },

  createUser: async (obj) => {
    return await fetch("https://634e9f834af5fdff3a625f84.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Помилка створення користувача");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Помилка створення користувача:", error);
        throw error;
      });
  },

  updateUserData: async (userId, newData) => {
    return await fetch(
      `https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("Помилка оновлення користувача:", error);
      });
  },
};

export default API;
