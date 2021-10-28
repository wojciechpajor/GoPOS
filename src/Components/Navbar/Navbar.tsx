import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark" >
            <div className="container">
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link' to='/products'>Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/categories'>Categories</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;