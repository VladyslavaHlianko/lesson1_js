import React, { useState, useEffect } from "react";
import "./style.sass";
import { Link } from "react-router-dom";

export default function Header({ logOut }) {
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



  return (
    <header>
      <Link to="/home">
        <img className="logo" src={`./image/logo.png`} alt="deer" />
      </Link>
      <div className="header">
        <div className="hi">
          {loggedInUser ? (
            <>
              <p>Hi,</p>
              <Link className="log_in" to="/home">
                {userName}
              </Link>
            </>
          ) : (
            <>
              <p>Hi,</p>
              <Link className="log_in" to="/login">
                Log in
              </Link>
            </>
          )}
        </div>
        <span className="line"></span>
        <Link className="basket_link" to="/login">
          <span className="basket">{basketCount}</span>
          <img src={`./image/shopping-cart.png`} alt="basket" />
        </Link>
        <Link
          className="log_out"
          to="#"
          onClick={logOut}
          style={{ display: loggedInUser ? "block" : "none" }}
        >
          Log out
        </Link>
      </div>
    </header>
  );
}