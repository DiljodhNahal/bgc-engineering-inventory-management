import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'

import './styles/Main.css'
import Button from './components/Button'
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import Alert from './components/Alert'

const Layout = () => {

    const [loaded, setLoaded] = useState(false)
    const [alerts, setAlerts] = useState([])
    const [authentication, setAuthentication] = useState()
    const [logoutPending, setLogoutPending] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)

    const navigation = useNavigate()
    const location = useLocation()

    useEffect(() => {
        fetch(`/api/autheticated`)
            .then(response => response.json())
            .then(data => {
                setAuthentication(data)
                if (data.status === false) {
                    navigation('/auth')
                } else{
                    reactLocalStorage.set('adminEmail', data.user.email);
                    reactLocalStorage.set('adminID', data.user.id);
                }
            })
            .then(() => {
                setLoaded(true)
            })
    }, [logoutPending])

    useEffect(() => {
        if (location.state !== null)
            if (location.state.alerts !== null)
                setAlerts(location.state.alerts)
    }, [location.state])

    const toggleModal = () => {
        setLogoutModal(!logoutModal)
    }

    const logOut = () => {
        setLogoutPending(true)
        fetch(`/api/logout`)
            .then(response => response.json())
            .then(data => {
                toggleModal()
                setLogoutPending(false)
                if (data.redirect === true) {
                    navigation('/auth')
                } else {
                    alert('An Unexpected Error Has Occurred!')
                }
            })
    }


    if (!loaded)
        return null

    return (
        <div>

            <Navbar authentication={authentication} toggleModal={toggleModal} />

            <div className={'alertContainer'}>
                {alerts.map(alert => <Alert text={alert.text} type={alert.type} />)}
            </div>

            <div className={'contentContainer'}>

                <div className={'content'}>

                    {logoutModal &&
                    <Modal
                        content={
                            <div className={'modalContent'}>
                                <h4>Are You Sure You Want To Log Out?</h4>
                                <div>
                                    <Button loading={logoutPending} onClick={logOut}>Yes, I'm Sure</Button>
                                    <Button onClick={toggleModal}>Nevermind</Button>
                                </div>
                            </div>
                        }
                        handleClose={toggleModal}
                    />
                    }

                    <Outlet />

                </div>

            </div>

        </div>
    )
}

export default Layout
