import React, { useEffect, useState } from "react";
import "./style.sass";
import API from "./../../services/api.js";
import { Box, Typography, CardMedia, Button } from "@mui/material";

const Home = ({ updateCartItemCount }) => {
  const [products, setProducts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [basketCount, setBasketCount] = useState(0);

  const addProduct = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { shoppingCart } = user || {};
      const existingProductIndex = shoppingCart.findIndex(
        (item) => item.id === product.id
      );

      let updatedShoppingCart;

      if (existingProductIndex !== -1) {
        updatedShoppingCart = shoppingCart.filter(
          (item) => item.id !== product.id
        );
        await deleteProduct(user.id, product.id);
      } else {
        updatedShoppingCart = [
          ...(shoppingCart || []),
          { id: product.id, count: 1 },
        ];
      }

      const updatedUser = {
        ...user,
        shoppingCart: updatedShoppingCart,
      };

      const response = await API.updateUserData(user.id, updatedUser);

      setLoggedInUser(response);
      updateCartItemCount(updatedUser.shoppingCart.length);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      const itemCount = loggedInUser.shoppingCart.length;
      updateCartItemCount(itemCount);
      setBasketCount(itemCount);
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser, updateCartItemCount]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        setLoggedInUser(user);
  
        const fetchedProducts = await API.getProducts();
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
  
    fetchData();
  }, []);
  

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

  return (
    <Box sx={{padding: "0 120px"}}>
      {Object.entries(products).map(([category, categoryProducts]) => (
        <Box key={category} className={category.toLowerCase()}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", fontSize: "22px", marginBottom: "20px" }}
          >
            {category}
          </Typography>
          <Box
            className={`${category.toLowerCase()}_cards`}
            sx={{ display: "flex", gap: "20px" }}
          >
            {categoryProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  padding: "20px",
                  background: "white",
                  width: "220px",
                  textAlign: "center",
                  borderRadius: "5px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  display: "flex",
                  boxShadow: "1px 2px 5px rgb(213, 213, 213)",
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.title}
                  src={`./image/products/${product.img}.png`}
                  sx={{ width: "80px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    gap: "15px",
                    marginTop: "15px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexFlow: "column",
                      alignItems: "start",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      {product.title}
                    </Typography>
                    {product.sale ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          margin: "15px 0 auto",
                        }}
                      >
                        <Typography
                          variant="span"
                          sx={{
                            textDecoration: "line-through",
                            color: "rgb(155, 155, 155)",
                          }}
                        >
                          ${product.price}
                        </Typography>
                        <Box
                          sx={{
                            color: "white",
                            background: "rgb(86, 159, 86)",
                            padding: "3px 7px",
                            borderRadius: "5px",
                            fontSize: "12px",
                          }}
                        >
                          -{product.salePercent}%
                        </Box>
                      </Box>
                    ) : null}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      {product.sale
                        ? `$${
                            product.price -
                            product.price * (product.salePercent / 100)
                          }`
                        : `$${product.price}`}
                    </Typography>
                    <Button
                      onClick={(e) => addProduct(product, e.target)}
                      style={{
                        background:
                          loggedInUser &&
                          loggedInUser.shoppingCart &&
                          loggedInUser.shoppingCart.length > 0 &&
                          loggedInUser.shoppingCart.some(
                            (item) => item.id === product.id
                          )
                            ? "green"
                            : "#e60303",
                        padding: "3px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      {loggedInUser &&
                      loggedInUser.shoppingCart &&
                      loggedInUser.shoppingCart.length > 0 &&
                      loggedInUser.shoppingCart.some(
                        (item) => item.id === product.id
                      ) ? (
                        <CardMedia
                          component="img"
                          src={`./image/shopping-cart.png`}
                          alt="ShoppingCart"
                          sx={{ height: "20px", width: "20px" }}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          src={`./image/shopping-cart.png`}
                          alt="ShoppingCart"
                          sx={{ height: "20px", width: "20px" }}
                        />
                      )}
                    </Button>
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