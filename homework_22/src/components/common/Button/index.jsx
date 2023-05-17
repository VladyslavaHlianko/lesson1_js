import React from 'react'
import './styles.sass'

export default function Button({ color= "#264eff", text, action = () => {} }) {
  return (
    <div 
      className='create'
      style={{background: color}} 
      onClick={action}
      > {text}
      </div>
  )
}
