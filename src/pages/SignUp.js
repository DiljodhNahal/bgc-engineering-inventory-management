import React, { useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal';
import '../styles/pages/SignUp.css'

const SignUp = () => {

    const [accountType, setAccountType] = useState(1)
    const [modalStatus, setModalStatus] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const updateAccountType = (event) => {
        setAccountType(event.target.value)
    }

    const toggleModal = () => {
        setModalStatus(!modalStatus)
    }

    const create = () => {

        // Confirm Passwords
        if (password !== confirmPassword)
            return  // Add Alert Here

        // Create
        fetch(`/api/signup`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => {
                console.log(response)
            })
    }

    return (
        <div id={'createEmployeeBody'}>

            {modalStatus &&
                <Modal
                    content={
                        <form className={'createForm'}>
                            <h3>Create {accountType === 1 ? "Equipment Manager" : "Administrator"}</h3>
                            <input
                                type={'email'}
                                className={'email'}
                                id={'email'}
                                onChange={event => setEmail(event.target.value)}
                                placeholder={'Email'}
                                required
                            />
                            <br />
                            <input
                                type={'password'}
                                id={'password'}
                                className={'password'}
                                onChange={event => setPassword(event.target.value)}
                                placeholder={'Password'}
                                required
                            />
                            <br />
                            <input
                                type={'password'}
                                id={'confirmPassword'}
                                className={'password'}
                                onChange={event => setConfirmPassword(event.target.value)}
                                placeholder={'Confirm Password'}
                                required
                            />
                            <br />
                            <Button onClick={create}>Create</Button>
                        </form>
                    }
                    handleClose={toggleModal}
                />
            }

            <h2>Create New Account</h2>

            <select value={accountType} onChange={updateAccountType}>
                <option value={1}>Equipment Manager</option>
                <option value={2}>Administrator</option>
            </select>

            <Button size={'small'} onClick={toggleModal}>Create Account</Button>

        </div>
    )

}

export default SignUp