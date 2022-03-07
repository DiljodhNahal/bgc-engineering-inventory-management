import React, { useEffect, useState } from 'react'
import { Outlet} from 'react-router-dom'

import './styles/Main.css'
import Navbar from './components/Navbar'

const Layout = () => {

    const [authentication, setAuthentication] = useState()

    useEffect(() => {
        fetch(`/api/autheticated`)
            .then(response => response.json())
            .then(data => {
                setAuthentication(data)
            })

    })

    return (
        <div>

            <Navbar />

            <div className={'contentContainer'}>

                <div className={'content'}>

                    <Outlet />

                </div>

            </div>

        </div>
    )
}

export default Layout
