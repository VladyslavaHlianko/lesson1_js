import React from 'react';
import './style.sass';

export default function Buttons({ handleSetFilter }) {
    const handleClick = (filter) => {
      handleSetFilter(filter);
    };
  
    return (
      <>
        <div 
          className='btn-all'
          style={{ background: "#264eff" }} 
          onClick={() => handleClick("all")}
        > All
        </div>
        <div 
          className='btn-pending'
          style={{ background: "red" }} 
          onClick={() => handleClick("pending")}
        > Pending
        </div>
        <div 
          className='btn-completed'
          style={{ background: "green" }} 
          onClick={() => handleClick("completed")}
        > Completed
        </div>
      </>
    );
  }