import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logoBarca.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import menu_icon from '../Assets/menu_icon.png'

const Navbar = () => {
    const [menu, setmenu] = useState('shop')
    const { sumTotalCart } = useContext(ShopContext)
    const menuRef = useRef()

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/');
    };

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>Barca shop</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={menu_icon} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={() => { setmenu('shop') }} > <Link to='/' style={{ textDecoration: 'none' }} >Shop</Link>{menu === 'shop' ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu('mens') }} ><Link to='/mens' style={{ textDecoration: 'none' }} >Men</Link>{menu === 'mens' ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu('womens') }} ><Link to='/womens' style={{ textDecoration: 'none' }} >Women</Link>{menu === 'womens' ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu('kids') }} ><Link to='/kids' style={{ textDecoration: 'none' }} >Kids</Link>{menu === 'kids' ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token')
                    ? <button onClick={handleLogout} >LogOut</button>
                    : <Link to='/login' style={{ textDecoration: 'none' }} ><button  >Login</button></Link>
                }
                <Link to='/cart' style={{ textDecoration: 'none' }} >
                    <img src={cart_icon} alt="" />
                </Link>
                <div className="nav-cart-count">{sumTotalCart}</div>
            </div>
        </div>
    )
}

export default Navbar
