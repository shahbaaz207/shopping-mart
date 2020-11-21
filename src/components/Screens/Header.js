import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {

   
    const openClick = () => {
        document.querySelector(".sidebar").classList.add("open");
      };
      const closeClick = () => {
        document.querySelector(".sidebar").classList.remove("open");
      };

    return (
        <div>
          <header className="header">
          <div className="brand">
            <button onClick={openClick}>&#9776;</button>

            <Link to='/'>Shopping Mart</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            <Link to='/signin'>Sign In</Link>

          
          </div>
        </header>

        {/* drawer menu */}
        <aside className="sidebar">
          <h5>Shopping Categories</h5>
          <button className="sidebar-close-button" onClick={closeClick}>
            X
          </button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
  
        </div>
    )
}
