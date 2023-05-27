import React, { useEffect, useState } from "react";
import "./style.sass";
import API from "./../../services/api.js";
import { Link } from "react-router-dom";

const Home = ({ updateCartItemCount, deleteProduct }) => {
  const [products, setProducts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [basketCount, setBasketCount] = useState(0);

  const getProductsFromDatabase = async () => {
    try {
      const response = await fetch(
        "https://634e9f834af5fdff3a625f84.mockapi.io/products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Помилка отримання товарів:", error);
      throw error;
    }
  };

  const updateUserData = async (userId, userData) => {
    try {
      const response = await fetch(
        `https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUserData = await response.json();

      console.log("Updated user data:", updatedUserData);
      return updatedUserData;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const addProduct = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const existingProductIndex = user.shoppingCart.findIndex(
        (item) => item.id === product.id
      );

      let updatedShoppingCart;

      if (existingProductIndex !== -1) {
        updatedShoppingCart = user.shoppingCart.filter(
          (item) => item.id !== product.id
        );
        await deleteProduct(user.id, product.id);
      } else {
        updatedShoppingCart = [
          ...user.shoppingCart,
          { id: product.id, count: 1 },
        ];
      }

      const updatedUser = {
        ...user,
        shoppingCart: updatedShoppingCart,
      };

      const response = await updateUserData(user.id, updatedUser);

      setLoggedInUser(response);
      setBasketCount(updatedUser.shoppingCart.length);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      const itemCount = loggedInUser.shoppingCart.length;
      updateCartItemCount(itemCount);
      setBasketCount(itemCount);
    }
  }, [loggedInUser, updateCartItemCount]);

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsFromDatabase();
        console.log(fetchedProducts);

        const groupedProducts = {};
        fetchedProducts.forEach((product) => {
          if (!groupedProducts[product.category]) {
            groupedProducts[product.category] = [];
          }
          groupedProducts[product.category].push(product);
        });

        setProducts(groupedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  return (
    <div className="wrapper">
      {Object.entries(products).map(([category, categoryProducts]) => (
        <section key={category} className={category.toLowerCase()}>
          <h2>{category}</h2>
          <div className={`${category.toLowerCase()}_cards`}>
            {categoryProducts.map((product) => (
              <div className="card_transport" key={product.id}>
                <img
                  className="img"
                  alt={product.title}
                  src={`./image/products/${product.img}.png`}
                />
                <div className="transport_inform">
                  <div className="transport_name">
                    <h3 className="transport_name-title">{product.title}</h3>
                    {product.sale ? (
                      <div className="transport_discont">
                        <p className="old_price">${product.price}</p>
                        <div className="transport_discont-amount">
                          -{product.salePercent}%
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="card_transport-price">
                    <h3 className="price">
                      {product.sale
                        ? `$${
                            product.price -
                            product.price * (product.salePercent / 100)
                          }`
                        : `$${product.price}`}
                    </h3>
                    <button
                      onClick={(e) => addProduct(product, e.target)}
                      className={
                        loggedInUser &&
                        loggedInUser.shoppingCart &&
                        loggedInUser.shoppingCart.length > 0 &&
                        loggedInUser.shoppingCart.some(
                          (item) => item.id === product.id
                        )
                          ? "product__cart-in"
                          : "product__cart"
                      }
                    >
                      {loggedInUser &&
                      loggedInUser.shoppingCart &&
                      loggedInUser.shoppingCart.length > 0 &&
                      loggedInUser.shoppingCart.some(
                        (item) => item.id === product.id
                      ) ? (
                        <img src={`./image/shopping-cart.png`} alt="" />
                      ) : (
                        <img src={`./image/shopping-cart.png`} alt="" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;