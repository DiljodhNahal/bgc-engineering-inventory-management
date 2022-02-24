import React from 'react'
import { Outlet } from 'react-router-dom'

import './styles/Main.css'

const Layout = () => {

    return (
        <div>

            <header id={'navigationContainer'}>

            </header>

            <div id={'contentContainer'}>
                <Outlet />
            </div>

        </div>
    )
}

export default Layout
