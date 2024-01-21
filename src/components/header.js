import React from 'react'
import'./header.css'

export const Header = () => {
  return (
    <div>
        <nav className='navbar'>
            <h2 className='logo'>Weather App</h2>
            <ul>
                <li><a href='./home.js'>Home</a> </li>
                <li><a href='./contact.js'>Contact Us</a> </li>
                <li><a href='./news'>News</a> </li>
                
            </ul>
        </nav>
    </div>
  )
}
