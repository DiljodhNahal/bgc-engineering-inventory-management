import React, { useState } from 'react'
import '../styles/components/Navbar.css'
import { useLocation } from 'react-router-dom'
import { MdMenu } from 'react-icons/md'
import Logo from '../assets/images/bgc_logo.png'


const Navbar = ({ authentication, toggleModal }) => {

    const [menuOpen, setMenuOpen] = useState(false)

    const toggle = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav className={'navigationBar'}>

            <a href={'/'} className={'logoContainer'}><img src={Logo} alt={'BGC Engineering'} className={'logo'} /></a>

            <div className={'menuButton'} onClick={toggle}><MdMenu size={32} color={'white'} /></div>

            <div className={`navigationMenu ${menuOpen && 'active'}`}>

                {authentication.status === true &&
                    <ul>
                        <li><a href={'/'}>Home</a></li>
                        <li><a href={'/search'}>Search</a></li>
                        {authentication.user.accountType !== 0 &&
                            <li><a href={'/dashboard'}>Dashboard</a></li>
                        }
                        <li><a style={{ cursor: 'pointer' }} onClick={toggleModal}>Logout</a></li>
                    </ul>
                }

            </div>

        </nav>
    )

}

export default Navbar