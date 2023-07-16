import React, { useState, useEffect } from "react";
import "./style.sass";
import { Link } from "react-router-dom";
import API from "../../../services/api";
import { Box, Typography, CardMedia } from "@mui/material";

export default function Header() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userName = loggedInUser ? loggedInUser.name : "";
  const [basketCount, setBasketCount] = useState(
    loggedInUser ? loggedInUser.shoppingCart.length : 0
  );

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setBasketCount(loggedInUser.shoppingCart.length);
    }
  }, [loggedInUser]);

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

  return (
    <>
      <Box
        component="header"
        sx={{
          background: "rgb(68, 158, 68)",
          height: "50px",
          padding: "5px 120px",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Link to="/home">
          <CardMedia
            component="img"
            src="./image/logo.png"
            alt="deer"
            sx={{ width: "35px", height: "40px" }}
          />
        </Link>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              gap: "5px",
              color: "white",
            }}
          >
            {loggedInUser ? (
              <>
                <Typography component="p" sx={{ m: 0 }}>
                  Hi,
                </Typography>
                <Typography component={Link} to="/account" sx={{ color: "white", textDecoration:"none" }}>
                  {userName}
                </Typography>
              </>
            ) : (
              <>
                <Typography component="p" sx={{ m: 0 }}>
                  Hi,
                </Typography>
                <Typography
                  component={Link}
                  to="/login"
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    textDecoration: "none",
                    paddingBottom: "2px",
                    borderBottom: "1px dashed white",
                }}
                >
                  Log in
                </Typography>
              </>
            )}
          </Box>
          {loggedInUser ? (
            <>
          <Box
            component={Link}
            to="/shoppingCart"
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-3px",
                right: "-7px",
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "white",
              },
            }}
          >
            <Box
              component="span"
              sx={{
                color: "rgb(68, 158, 68)",
                position: "absolute",
                right: "-3px",
                top: "-4.5px",
                fontSize: "12px",
              }}
            >
              {basketCount}
            </Box>
            <CardMedia
              component="img"
              src={`./image/shopping-cart.png`}
              alt="ShoppingCart"
              sx={{ height: "25px" }}
            />
          </Box>
          </>) : (
              <>
          <Box
            component={Link}
            to="/login"
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-3px",
                right: "-7px",
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "white",
              },
            }}
          >
            <Box
              component="span"
              sx={{
                color: "rgb(68, 158, 68)",
                position: "absolute",
                right: "-3px",
                top: "-4.5px",
                fontSize: "12px",
              }}
            >
              {basketCount}
            </Box>
            <CardMedia
              component="img"
              src={`./image/shopping-cart.png`}
              alt="ShoppingCart"
              sx={{ height: "25px" }}
            />
          </Box>
              </> 
            )}
          <Typography
            to="#"
            onClick={logOut}
            sx={{
              color: "white",
              margin: "0 0 0 10px",
              cursor: "pointer",
              textDecoration: "none",
              paddingBottom: "2px",
              borderBottom: "1px dashed white",
              display: loggedInUser ? "block" : "none",
            }}
          >
            Log out
          </Typography>
        </Box>
      </Box>
    </>
  );
}

