import React from 'react'
import { Outlet} from 'react-router-dom'

import './styles/Main.css'
import Navbar from './components/Navbar'

const Layout = () => {

    return (
        <div>

            <Navbar />

            <div className={'contentContainer'}>

                <Outlet />

            </div>

        </div>
    )
}

export default Layout
