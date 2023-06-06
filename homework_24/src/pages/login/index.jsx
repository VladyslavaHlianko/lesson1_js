import React, { useEffect, useState } from "react";
import "./style.sass";

import { Box, Button, TextField, Typography } from "@mui/material";


export default function Login({
  handleSignIn,
  handleCreateAccount,
  signInError,
  createError,
}) {
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");

  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [errorSignIn, setErrorSignIn] = useState("");
  const [errorCreate, setErrorCreate] = useState("");

  const handleSubmitSignIn = (event) => {
    event.preventDefault();
    handleSignIn(emailSignIn, passwordSignIn);
  };

  const handleSubmitCreateAccount = (event) => {
    event.preventDefault();
    handleCreateAccount(
      createName,
      createEmail,
      createPassword,
      verifyPassword
    );
  };

  useEffect(() => {
    setErrorSignIn(signInError);
  }, [signInError]);

  useEffect(() => {
    setErrorCreate(createError);
  }, [createError]);

  return (
    <Box sx={{ background: "#f8f8f8", Width: "100%", height: "100%", padding: "0 120px"
  }}>
      <Box
        display="flex"
        justifyContent="space-between"
        gap={4}
        className="registr"
      >
        <form onSubmit={handleSubmitSignIn} sx={{ flex: "1 50%" }} className="sign">
          <Typography variant="h1" sx={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>
            Secure Sign In
          </Typography>
          <Typography variant="h2" sx={{ fontSize: 16, margin: "0 0 15px", fontWeight: "600" }}>
            For current customers
          </Typography>
          {signInError && (
            <Typography variant="div" className="error" sx={{ display: "block", margin: "15px 0 5px" }}>
              {signInError}
            </Typography>
          )}
          <TextField
            type="email"
            placeholder="Email Address"
            value={emailSignIn}
            onChange={(event) => setEmailSignIn(event.target.value)}
            required
            fullWidth
            sx={{ borderRadius: "5px", margin: "5px 0 5px", backgroundColor: "white" }}
          />
          <TextField
            type="password"
            placeholder="Password"
            value={passwordSignIn}
            onChange={(event) => setPasswordSignIn(event.target.value)}
            required
            fullWidth
            sx={{ borderRadius: "5px", margin: "5px 0 20px", backgroundColor: "white" }}
          />
          <Button variant="contained" type="submit" className="sign_in" sx={{ ...buttonStyles }}>
            Sign in
          </Button>
        </form>
        <form onSubmit={handleSubmitCreateAccount} sx={{ flex: "1 50%" }} className="create">
          <Typography variant="h1" sx={{ fontSize: 28, fontWeight: "bold", marginBottom: "10px" }}>
            Quick Registration
          </Typography>
          <Typography variant="h2" sx={{ fontSize: 16, margin: "0 0 15px", fontWeight: 600 }}>
            For new customers
          </Typography>
          {createError && (
            <Typography variant="div" className="errorCreate" sx={{ display: "block",  margin: "15px 0 5px" }}>
              {createError}
            </Typography>
          )}
          <TextField
            id="createName"
            type="text"
            placeholder="Full name"
            value={createName}
            onChange={(event) => setCreateName(event.target.value)}
            required
            fullWidth
            sx={{ borderRadius: "5px", margin: "5px 0 5px", backgroundColor: "white" }}
          />
          <TextField
            id="createEmail"
            type="email"
            placeholder="Email Address"
            value={createEmail}
            onChange={(event) => setCreateEmail(event.target.value)}
            required
            fullWidth
            sx={{ borderRadius: "5px", margin: "5px 0 5px", backgroundColor: "white" }}
          />
          <TextField
            id="password"
            type="password"
            placeholder="Password"
            value={createPassword}
            onChange={(event) => setCreatePassword(event.target.value)}
            required
            fullWidth
            sx={{ borderRadius: "5px", margin: "5px 0 5px", backgroundColor: "white" }}
          />
          <TextField
            id="verify_password"
            type="password"
            placeholder="Verify Password"
            value={verifyPassword}
            onChange={(event) => setVerifyPassword(event.target.value)}
            required
            fullWidth
            sx={{ borderRadius: "5px", margin: "5px 0 20px", backgroundColor: "white" }}
          />
          <Button variant="contained" type="submit" className="sign_in" sx={{ ...buttonStyles }}>
            Create Account
          </Button>
        </form>
      </Box>
    </Box>
  );
}

const buttonStyles = {
  background: "rgb(207, 23, 23)",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "30px",
  padding: "10px 30px",
  fontWeight: "bold",
};