import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TableCell,
  TableRow,
  Table,
  CardMedia,
  TableHead,
  TableBody,
} from '@mui/material';
import API from '../../services/api';

const ShoppingCart = ({ updateCartItemCount }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const fetchData = async () => {
      try {
        const usersResponse = await API.getUsers();
        const logged = usersResponse.find(user => user.id === loggedInUser.id);
        setOrders(logged?.shoppingCart || []);
        const productsResponse = await API.getProducts();
        setProducts(productsResponse);
      } catch (error) {
        console.error('Помилка отримання даних користувача:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      updateCartItemCount(loggedInUser.shoppingCart.length);
    }
  }, [orders]);

  useEffect(() => {
    let totalPrice = 0;

    orders.forEach(item => {
      const product = products.find(product => product.id === item.id);
      if (product) {
        const itemTotal = product.sale
          ? (product.price - (product.price * (product.salePercent / 100))) * item.count
          : product.price * item.count;
        totalPrice += itemTotal;
      }
    });

    setTotalPrice(totalPrice);
  }, [orders, products]);

  const handleDeleteProduct = async (productId) => {
    try {
      const updatedCart = orders.filter(item => item.id !== productId);
      setOrders(updatedCart);
  
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      loggedInUser.shoppingCart = updatedCart;
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      await API.updateUserData(loggedInUser.id, loggedInUser);
      
      if (loggedInUser) {
        const updatedCart = loggedInUser.shoppingCart.filter(item => item.id !== productId);
        loggedInUser.shoppingCart = updatedCart;
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      }
      updateCartItemCount(updatedCart.length);
    } catch (error) {
      console.error('Помилка видалення товару:', error);
    }
  };
  

  const handleQuantityChange = async (productId, quantity) => {
    const updatedOrders = orders.map(item => {
      if (item.id === productId) {
        return { ...item, count: quantity };
      }
      return item;
    });
    setOrders(updatedOrders);
  
    const product = products.find(product => product.id === productId);
    if (product) {
      const itemTotal = product.sale
        ? (product.price - (product.price * (product.salePercent / 100))) * quantity
        : product.price * quantity;
      setTotalPrice(prevTotalPrice => prevTotalPrice - itemTotal);
    }
  
    try {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUser) {
        loggedInUser.shoppingCart = updatedOrders;
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        await API.updateUserData(loggedInUser.id, loggedInUser);
      }
    } catch (error) {
      console.error('Помилка оновлення кількості товару:', error);
    }
  };
  
  const handleCompleteOrder = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const shoppingCart = loggedInUser.shoppingCart;

    if (shoppingCart.length === 0) {
      console.log('Shopping cart is empty');
      return;
    }

    loggedInUser.orders = [...shoppingCart];
    loggedInUser.shoppingCart = [];
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    await API.updateUserData(loggedInUser.id, loggedInUser);

    console.log('Order completed successfully');
    window.location.href = '/account';
  };

  return (
    <Box
      sx={{
        padding: '0 120px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '50px',
        }}
      >
        <Box
          sx={{
            minWidth: '800px',
            margin: '20px 0 0',
          }}
        >
          <Typography component="h2" sx={{ color: 'rgb(47, 182, 47)', fontWeight: "bold", margin: "0 0 10px" }}>
          Items in Shopping Cart
          </Typography>
          {orders.length === 0 ? (
            <Typography variant="h2"></Typography>
          ) : (
            <Table sx={{ width: '100%', 
            borderCollapse: "collapse",
            borderSpacing: "0", }}>
              <TableHead>
                <TableRow>
                  <TableCell
                        sx={{
                          background: 'rgb(199, 196, 196)',
                          textAlign: 'center',
                          padding: '5px',
                        }}>Item Description</TableCell>
                  <TableCell
                        sx={{
                          background: 'rgb(199, 196, 196)',
                          textAlign: 'center',
                          padding: '5px',
                        }}>Price</TableCell>
                  <TableCell
                        sx={{
                          background: 'rgb(199, 196, 196)',
                          textAlign: 'center',
                          padding: '5px',
                        }}>Sale</TableCell>
                  <TableCell
                        sx={{
                          background: 'rgb(199, 196, 196)',
                          textAlign: 'center',
                          padding: '5px',
                        }}>Quantity</TableCell>
                  <TableCell
                        sx={{
                          background: 'rgb(199, 196, 196)',
                          textAlign: 'center',
                          padding: '5px',
                        }}>Total</TableCell>
                  <TableCell
                        sx={{
                          background: 'rgb(199, 196, 196)',
                          textAlign: 'center',
                          padding: '5px',
                        }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((item) => {
                  const product = products.find((product) => product.id === item.id);
                  if (!product) return null;

                  const total = product.sale
                    ? (product.price - (product.price * (product.salePercent / 100))) * item.count
                    : product.price * item.count;

                  return (
                    <TableRow key={item.id}>
                      <TableCell sx={{
                        textAlign: "center",
                        padding: "15px",
                        verticalAlign: "middle",
                      }}>
                        <Box display="flex" alignItems="center" sx={{
                          gap: "20px",
                        }}>
                          <CardMedia
                            component="img"
                            src={`./image/products/${product.img}.png`}
                            alt=""
                            style={{ width: '100px', height: '100px' }}
                          />
                          <Typography sx={{fontWeight: "bold"}}>{product.title}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{
                        textAlign: "center",
                        padding: "15px",
                        verticalAlign: "middle",
                      }}>
                        <Typography>${product.price}</Typography>
                      </TableCell>
                      <TableCell sx={{
                        textAlign: "center",
                        padding: "15px",
                        verticalAlign: "middle",
                      }}>
                        {product.sale ? (
                          <Typography sx={{
                            color:  "white",
                            background: "rgb(86, 159, 86)",
                            padding: "3px 7px",
                            borderRadius: "5px",
                            fontSize: "14px",
                          }}>
                            -{product.salePercent}%
                          </Typography>
                        ) : (
                          <Typography>-</Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{
                        textAlign: "center",
                        padding: "15px",
                        verticalAlign: "middle",
                      }}>
                        <input
                          value={item.count}
                          type="number"
                          min="1"
                          max="100"
                          step="1"
                          onChange={(event) =>
                            handleQuantityChange(item.id, parseInt(event.target.value))
                          }
                        />
                      </TableCell>
                      <TableCell sx={{
                        textAlign: "center",
                        padding: "15px",
                        verticalAlign: "middle",
                      }}>
                        <Typography>${total}</Typography>
                      </TableCell>
                      <TableCell sx={{
                        textAlign: "center",
                        padding: "15px",
                        verticalAlign: "middle",
                      }}>
                        <Box
                          component="button"
                          variant="contained"
                          color="primary"
                          onClick={() => handleDeleteProduct(item.id)}
                          sx={{
                            border: "none",
                            background: "transparent",
                            cursor:"pointer",
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                            width:"20px",
                            height:"20px",
                          }} src="./image/delete.png" alt="" />
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Box>
        <Box sx={{
          width: "100%",
          margin: "20px 0 0",
        }}>
          <Typography component="h2" sx={{ color: "rgb(47, 182, 47)", fontWeight: "bold", margin: "0 0 10px"}}>
            My Order Summary
          </Typography>
          <Box sx={{
            margin: "0 0 30px",
            display: "flex",
            justifyContent: "space-between",
          }}>
            <Typography component="p">Order Total</Typography>
            <Typography component="p">
              ${totalPrice}
            </Typography>
          </Box>
          <Button 
          onClick={handleCompleteOrder}
          sx={{
            display: "block",
            margin: "0 auto",
            cursor: "pointer",
            background: "rgb(207, 23, 23)",
            color: "white",
            border: "none",
            borderRadius: "30px",
            padding: "10px 30px",    
            fontWeight: "bold",
            "&:hover":{
              background: "rgb(207, 23, 23)",
            },
          }}>Complete Order</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
