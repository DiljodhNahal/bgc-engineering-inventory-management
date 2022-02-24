import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {

    return (
        <div>
            <p>
                Layout.js
            </p>
            <Outlet />
        </div>
    )
}

export default Layout
