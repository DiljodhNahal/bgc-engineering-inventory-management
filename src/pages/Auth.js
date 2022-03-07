import React, { useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal';
import '../styles/pages/SignUp.css'

const Auth = () => {

    const [accountType, setAccountType] = useState(0)
    const [modalStatus, setModalStatus] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {

        let body = {password: password}
        if (accountType === 1)
            body.username = email

        fetch(`/api/auth`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            if(response.redirected){
                window.location.replace(response.url)
            }
        })

    }

    const toggleModal = () => {
        setModalStatus(!modalStatus)
    }

    const begin = (type) => {
        setAccountType(type)
        toggleModal()
    }

    return (
        <div id={'createEmployeeBody'}>

            {modalStatus &&
            <Modal
                content={
                    <form className={'createForm'}>
                        <h3>Login</h3>

                        {accountType === 1 &&
                        <input
                            type={'email'}
                            className={'email'}
                            id={'email'}
                            onChange={event => setEmail(event.target.value)}
                            placeholder={'Email'}
                            required
                        />
                        }

                        <input
                            type={'password'}
                            className={'password'}
                            id={'password'}
                            onChange={event => setPassword(event.target.value)}
                            placeholder={'Password'}
                            required
                        />

                        <Button onClick={login}>Login</Button>
                    </form>
                }
                handleClose={toggleModal}
            />
            }

            <h2>Login</h2>
            <Button onClick={() => begin(0)}>Employee</Button>
            <Button onClick={() => begin(1)}>Manager</Button>

        </div>
    )

}

export default Auth