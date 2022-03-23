import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { reactLocalStorage } from 'reactjs-localstorage'
import Table from "../components/Table"
import Modal from '../components/Modal';
import Button from '../components/Button'
import '../styles/pages/ManageUser.css'

const ManageUser = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [modalAdminDelete, setModalAdminDelete] = useState(false)

    const [id, setID] = useState('')
    const [accountType, setAccountType] = useState(1)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const location = useLocation()
    const navigation = useNavigate()

    const toDelete = () => {
        setLoading(true)
        try {
            fetch(
                `/api/users/delete/${id}`,
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    setLoading(false)
                    toggleDeleteModal()
                    window.location.reload(true)
                    console.log(response)
                })
        } catch (exception) {
            console.error(exception.message)
        }
    }

    const toDeleteAdmin = () => {
        setLoading(true)
        try {
            fetch(
                `/api/users/admin/delete/${id}`,
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => response.json())
                .then(data => {
                    setLoading(false)
                    toggleDeleteAdminModal()
                    if (data.redirect === true) {
                        navigation('/auth')
                        window.location.reload(true)
                    } else {
                        alert('An Unexpected Error Has Occurred!')
                    }
                })
        } catch (exception) {
            console.error(exception.message)
        }
    }

    const toUpdate = () => {
        setLoading(true)
        try {
            if (password !== confirmPassword) {
                alert("Password's do not match")
                setLoading(false)
                return
            } else if (password === '' || confirmPassword === '' || email === '') {
                alert("Missing Fields")
                setLoading(false)
                return
            }

            var check = checkEmailExists()
            if (check) {
                setLoading(false)
                return
            }

            fetch(`/api/users/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    accountType: accountType
                })
            })
                .then(response => {
                    setLoading(false)
                    if (response.status === 500) {
                        alert("An Unexpected Error Has Occurred")
                    } else {
                        setEmail('')
                        setPassword('')
                        setConfirmPassword('')
                        setModalUpdate(false)
                        window.location.reload(true)
                        alert("Account Successfully Updated")
                    }
                })
        } catch (exception) {
            console.error(exception.message)
        }
    }

    const toggleDeleteModal = () => {
        setModalDelete(!modalDelete)
    }

    const toggleUpdateModal = () => {
        setModalUpdate(!modalUpdate)
    }

    const toggleDeleteAdminModal = () => {
        setModalAdminDelete(!modalAdminDelete)
    }

    const checkEmailExists = () => {
        for (let i = 0; i < users.length; i++) {
            if ((users[i].email === email) && (email !== reactLocalStorage.get('adminEmail'))) {
                alert("Email already exists")
                return true
            }
        }

        return false
    }

    const getUsers = async () => {
        try {
            const response = await fetch("/users");
            const jsonData = await response.json();
            setUsers(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            {modalDelete &&
                <Modal
                    content={
                        <form className={'createForm'}>
                            <h3>This action cannot be reversed. Permanently delete this user?</h3>
                            <Button onClick={toDelete}>Delete</Button>
                        </form>
                    }
                    handleClose={toggleDeleteModal}
                />
            }

            {modalAdminDelete &&
                <Modal
                    content={
                        <form className={'createForm'}>
                            <h3>This action cannot be reversed. Permanently deleting this account will log you out. Confirm?</h3>
                            <Button onClick={toDeleteAdmin}>Delete</Button>
                        </form>
                    }
                    handleClose={toggleDeleteModal}
                />
            }

            {modalUpdate &&
                <Modal
                    content={
                        <form className={'createForm'}>
                            <h3>Update Account Information</h3>
                            <input
                                type={'email'}
                                className={'email'}
                                id={'email'}
                                value={email}
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
                                placeholder={'Enter New Password'}
                                required
                            />
                            <br />
                            <input
                                type={'password'}
                                id={'confirmPassword'}
                                className={'password'}
                                onChange={event => setConfirmPassword(event.target.value)}
                                placeholder={'Confirm New Password'}
                                required
                            />
                            <br />
                            <Button onClick={toUpdate} loading={loading}>Update</Button>
                        </form>
                    }
                    handleClose={toggleUpdateModal}
                />
            }

            <div className={'manageCurrent'}>
                <button onClick={() => {
                    setID(reactLocalStorage.get('adminID'))
                    setEmail(reactLocalStorage.get('adminEmail'))
                    setAccountType(2)
                    toggleUpdateModal()
                }}>Manage Account</button>
                <button onClick={() => {
                    setID(reactLocalStorage.get('adminID'))
                    setEmail(reactLocalStorage.get('adminEmail'))
                    setAccountType(2)
                    toggleDeleteAdminModal()
                }}>
                    Delete Account
                </button>
            </div>

            <Table
                content={
                    <React.Fragment>
                        <thead>
                            <tr>
                                <th>Account Type</th>
                                <th>Email</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (user.accountType === 2) ? (
                                null
                            ) :
                                <tr key={user.id}>
                                    <td>{user.accountType === 0 ? 'Employee' : 'Equipment Manager'}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => {
                                            setID(user.id)
                                            setAccountType(user.accountType)
                                            setEmail(user.email)
                                            toggleUpdateModal()
                                        }}>
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            setID(user.id)
                                            toggleDeleteModal()
                                        }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </React.Fragment>
                }
            ></Table>
        </div >

    )
}

export default ManageUser