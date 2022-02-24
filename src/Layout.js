import React from 'react'
import { Outlet } from 'react-router-dom'

import './styles/Main.css'

const Layout = () => {

    return (
        <div>

            <div className={'outer'}>

                <div className={'navigationContainer'}>

                </div>

                <div className={'contentContainer'}>

                    <Outlet />

                </div>

            </div>

        </div>
    )
}

export default Layout
