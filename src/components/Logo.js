import React from 'react'

export const Logo = () => {
  return (
    <div className="logo-container">
      <img src={require('../images/logo.png')} className="logo-img" />
      <p className="logo-text">DEV STATS</p>
    </div>
  )
}
