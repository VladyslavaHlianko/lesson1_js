import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Login from "./pages/login";
import Header from "./pages/components/common";
import Home from "./pages/home";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./pages/notFound";
import PrivateRoute from "./pages/components/PrivateRoute.jsx";

function App() {
  const [basketCount, setBasketCount] = useState(0);

  const updateCartItemCount = useCallback((itemCount) => {
    setBasketCount(itemCount);
  }, []);

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
      const itemCount = loggedInUser.shoppingCart.length;
      updateCartItemCount(itemCount);
    }
  }, [loggedInUser, updateCartItemCount]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home
                updateCartItemCount={updateCartItemCount}
                loggedInUser={loggedInUser}
              />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
