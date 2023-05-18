import React from 'react'
import './style.sass'

const Button = ({ color = "#264eff", text, action }) => {
  return (
    <div className="create" style={{ background: color }} onClick={action}>
      {text}
    </div>
  );
};

export default Button;
