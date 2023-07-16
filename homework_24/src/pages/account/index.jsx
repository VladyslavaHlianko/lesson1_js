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

const Account = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const deleteUser = async () => {
    let btn_delete = document.querySelector('.btn_delete');

    if (localStorage.getItem('loggedInUser')) {
        btn_delete.addEventListener('click', () => {
            let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            API.deleteUser(loggedInUser.id)
                .then(() => {
                    localStorage.clear();
                    window.location.href = 'index.html';
                })
                .catch(err => console.error('Помилка створення користувача:', err));
        });
    }
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
          My Info
          </Typography>
          <Box sx={{
            margin: "0 0 30px",
            display: "flex",
            justifyContent: "space-between",
            flexFlow: "column",
          }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Typography component="p">Name:</Typography>
                <Typography component="p">
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Typography component="p">Email:</Typography>
                <Typography component="p">
                </Typography>
            </Box>
          </Box>
          <Button 
          onClick={deleteUser}
          deleteUser
          sx={{
            display: "block",
            margin: "0 auto",
            cursor: "pointer",
            background: "rgb(249, 211, 211)",
            color: "rgb(177, 91, 91)",
            border: "none",
            borderRadius: "30px",
            padding: "10px 30px",    
            fontWeight: "bold",
            "&:hover":{
              background: "rgb(249, 211, 211)",
            },
          }}>Delete account</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
