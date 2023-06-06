import React, { useEffect, useState } from "react";
import "./style.sass";
import API from "./../../services/api.js";
import { Link } from "react-router-dom";

import { Box, Typography, CardMedia } from '@mui/material';



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
  <Box className="wrapper">
    {Object.entries(products).map(([category, categoryProducts]) => (
      <Box key={category} className={category.toLowerCase()}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '22px', marginBottom: '20px' }}>
          {category}
        </Typography>
        <Box className={`${category.toLowerCase()}_cards`} sx={{ display: 'flex', gap: '20px' }}>
          {categoryProducts.map((product) => (
            <Box className="card_transport" key={product.id} sx={{
              padding: '20px',
              background: 'white',
              width: '220px',
              textAlign: 'center',
              borderRadius: '5px',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
              display: 'flex',
              boxShadow: '1px 2px 5px rgb(213, 213, 213)'
            }}>
              <CardMedia
                className="img"
                component="img"
                alt={product.title}
                src={`./image/products/${product.img}.png`}
                sx={{ width: '80px' }}
              />
              <Box className="transport_inform" sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                gap: '15px',
                marginTop: '15px'
              }}>
                <Box className="transport_name" sx={{ display: 'flex', flexFlow: 'column', alignItems: 'start' }}>
                  <Typography variant="h3" className="transport_name-title" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                    {product.title}
                  </Typography>
                  {product.sale ? (
                    <Box className="transport_discont" sx={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '15px 0 auto' }}>
                      <Typography variant="body1" className="old_price" sx={{ textDecoration: 'line-through', color: 'rgb(155, 155, 155)' }}>
                        ${product.price}
                      </Typography>
                      <Box className="transport_discont-amount" sx={{ color: 'white', background: 'rgb(86, 159, 86)', padding: '3px 7px', borderRadius: '5px', fontSize: '12px' }}>
                        -{product.salePercent}%
                      </Box>
                    </Box>
                  ) : null}
                </Box>
                <Box className="card_transport-price" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h3" className="price" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                    {product.sale
                      ? `$${product.price - product.price * (product.salePercent / 100)}`
                      : `$${product.price}`}
                  </Typography>
                  <button
                    onClick={(e) => addProduct(product, e.target)}
                    style={{
                      background:
                        loggedInUser &&
                        loggedInUser.shoppingCart &&
                        loggedInUser.shoppingCart.length > 0 &&
                        loggedInUser.shoppingCart.some((item) => item.id === product.id)
                          ? 'green'
                          : '#e60303',
                      padding: '3px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    {loggedInUser &&
                    loggedInUser.shoppingCart &&
                    loggedInUser.shoppingCart.length > 0 &&
                    loggedInUser.shoppingCart.some((item) => item.id === product.id) ? (
                      <img src={`./image/shopping-cart.png`} alt="" style={{ height: '20px' }} />
                    ) : (
                      <img src={`./image/shopping-cart.png`} alt="" style={{ height: '20px' }} />
                    )}
                  </button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    ))}
  </Box>
);

};


export default Home;