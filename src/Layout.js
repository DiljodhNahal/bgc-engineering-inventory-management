import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MdMenu } from 'react-icons/all'

import './styles/Main.css'
import logo from './assets/images/bgc_logo.png'

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {width, height}
}

const Layout = () => {

    const [windowWidth, setWindowWidth] = useState(getWindowDimensions().width)

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(getWindowDimensions().width)
        }

        window.addEventListener('resize', handleWindowResize)
    }, [])

    return (
        <div>

            <div className={'outer'}>

                <header className={'header'}>

                    <ul>

                        <li>
                            <a href='/'>
                                <img src={logo} alt={'Logo'} className={'logo'} />
                            </a>
                        </li>

                        <div className={'navigationContent'}>
                            {(windowWidth > 480) ?
                                <div>
                                    <li><a href={'/'}>Home</a></li>
                                    <li><a href={'/search'}>Search</a></li>
                                    <li><a href={'/dashboard'}>Dashboard</a></li>
                                </div>
                                :
                                <div>
                                    <a href={'/'}><MdMenu color={'white'} size={32} /></a>
                                </div>
                            }
                        </div>

                    </ul>

                </header>

                <div className={'contentContainer'}>
                    <Outlet />

                </div>

            </div>

        </div>
    )
}

export default Layout
