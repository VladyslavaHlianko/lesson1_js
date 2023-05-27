import React, { useEffect, useState } from "react";
import "./style.sass";

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
    <div className="wrapper">
      <main className="registr">
        <form onSubmit={handleSubmitSignIn} className="sign">
          <h1>Secure Sign In</h1>
          <p className="subtitle">For current customers</p>
          {errorSignIn && <div className="error">{errorSignIn}</div>}
          <input
            className="email_signIn"
            type="email"
            placeholder="Email Address"
            value={emailSignIn}
            onChange={(event) => setEmailSignIn(event.target.value)}
            required
          />
          <input
            className="password_signIn"
            type="password"
            placeholder="Password"
            value={passwordSignIn}
            onChange={(event) => setPasswordSignIn(event.target.value)}
            required
          />
          <button className="sign_in">Sign in</button>
        </form>
        <form onSubmit={handleSubmitCreateAccount} className="create">
          <h1>Quick Registration</h1>
          <p className="subtitle">For new customers</p>
          {errorCreate && <div className="errorCreate">{errorCreate}</div>}
          <input
            id="createName"
            type="text"
            placeholder="Full name"
            value={createName}
            onChange={(event) => setCreateName(event.target.value)}
            required
          />
          <input
            id="createEmail"
            type="email"
            placeholder="Email Address"
            value={createEmail}
            onChange={(event) => setCreateEmail(event.target.value)}
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={createPassword}
            onChange={(event) => setCreatePassword(event.target.value)}
            required
          />
          <input
            id="verify_password"
            type="password"
            placeholder="Verify Password"
            value={verifyPassword}
            onChange={(event) => setVerifyPassword(event.target.value)}
            required
          />
          <button className="sign_in">Create Account</button>
        </form>
      </main>
    </div>
  );
}