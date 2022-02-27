import React, { useState } from 'react'
import '../styles/components/Navbar.css'
import { useLocation } from 'react-router-dom'
import { MdMenu } from 'react-icons/md'
import Logo from '../assets/images/bgc_logo.png'


const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    const toggle = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav className={'navigationBar'}>

            <a href={'/'} className={'logoContainer'}><img src={Logo} alt={'BGC Engineering'} className={'logo'} /></a>

            <div className={'menuButton'} onClick={toggle}><MdMenu size={32} color={'white'} /></div>

            <div className={`navigationMenu ${menuOpen && 'active'}`}>

                <ul>

                    <li><a href={'/'} className={`${useLocation().pathname === '/' && 'currentLocation'}`}>Home</a></li>
                    <li><a href={'/search'} className={`${useLocation().pathname === '/search' && 'currentLocation'}`}>Search</a></li>
                    <li><a href={'/dashboard'} className={`${useLocation().pathname === '/dashboard' && 'currentLocation'}`}>Dashboard</a></li>
                    <li><a href={'/auth'} className={`${useLocation().pathname === '/auth' && 'currentLocation'}`}>Log In</a></li>

                </ul>

            </div>

        </nav>
    )

}

export default Navbar