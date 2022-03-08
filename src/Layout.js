import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import './styles/Main.css'
import Navbar from './components/Navbar'

const Layout = () => {

    const [loaded, setLoaded] = useState(false)
    const [authentication, setAuthentication] = useState()

    const navigation = useNavigate()

    useEffect(() => {
        fetch(`/api/autheticated`)
            .then(response => response.json())
            .then(data => {
                setAuthentication(data)
                if (data.status === false) {
                    navigation('/auth')
                }
            })
            .then(() => {
                setLoaded(true)
            })
    }, [])

    if (!loaded)
        return null

    return (
        <div>

            <Navbar authentication={authentication} />

            <div className={'contentContainer'}>

                <div className={'content'}>

                    <Outlet />

                </div>

            </div>

        </div>
    )
}

export default Layout
