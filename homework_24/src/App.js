import { useEffect, useState, setInCart } from "react";
import "./App.css";
import Login from "./pages/login";
import Header from "./pages/components/common";
import API from "./services/api.js";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./pages/components/PrivateRoute.jsx";

function App() {
  const [basketCount, setBasketCount] = useState(0);

  const updateCartItemCount = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setBasketCount(loggedInUser.shoppingCart.length);
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const users = await API.getUsers();
      const matchedUser = users.find((user) => user.email === email);

      if (matchedUser === undefined) {
        setErrorSignIn("Invalid email");
        throw new Error("Invalid email");
      } else if (matchedUser.password !== password) {
        setErrorSignIn("Invalid password");
        throw new Error("Invalid password");
      } else {
        matchedUser.status = true;
        await API.updateUserData(matchedUser.id, matchedUser);

        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
        updateCartItemCount(matchedUser.shoppingCart.length);
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorSignIn(error.message);
    }
  };

  const logOut = () => {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    loggedInUser.status = false;

    API.updateUserData(loggedInUser.id, loggedInUser)
      .then(() => {
        console.log("Користувач оновлений успішно");
        localStorage.clear();
        window.location.href = "/home";
      })
      .catch((error) => {
        console.error("Помилка оновлення користувача:", error);
      });
  };

  const deleteProduct = async (userId, productId) => {
    try {
      let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      let shoppingCart = loggedInUser.shoppingCart;

      let updatedShoppingCart = shoppingCart.filter(
        (item) => item.id !== productId
      );
      loggedInUser.shoppingCart = updatedShoppingCart;

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      await API.updateUserData(userId, loggedInUser);

      updateCartItemCount();
      console.log("Product deleted successfully");
      console.log("Updated loggedInUser:", loggedInUser);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  const handleCreateAccount = async (name, email, password, verifyPassword) => {
    try {
      const users = await API.getUsers();
      const matchedUser = users.some((user) => user.email === email);
  
      if (password !== verifyPassword) {
        throw new Error("Password does not match!");
      } else if (matchedUser) {
        setErrorCreate(`User with email "${email}" already exists!`);
        throw new Error(`User with email "${email}" already exists!`);
      } else {
        const newUser = {
          name,
          password,
          email,
          orders: [],
          shoppingCart: [],
          status: true,
        };
  
        const createdUser = await API.createUser(newUser);
        console.log("User created successfully");
  
        localStorage.setItem("loggedInUser", JSON.stringify(createdUser));
        setLoggedInUser(createdUser); 
  
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorCreate(error.message);
    }
  };
  

  const [errorSignIn, setErrorSignIn] = useState("");
  const [errorCreate, setErrorCreate] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
      setBasketCount(storedUser.shoppingCart.length);
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      
      updateCartItemCount();
    }
  }, [loggedInUser]);


  return (
    <>
    <Header logOut={logOut} />
    <Routes>
      <Route
        path="/login"
        element={
          <Login
            handleSignIn={handleSignIn}
            handleCreateAccount={handleCreateAccount}
            signInError={errorSignIn}
            createError={errorCreate}
          />
        }
      />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home
              updateCartItemCount={updateCartItemCount}
              loggedInUser={loggedInUser}
              deleteProduct={deleteProduct}
            />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
};


export default App;
