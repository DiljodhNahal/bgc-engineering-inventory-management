import React, { useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal';
import '../styles/pages/SignUp.css'

const SignUp = () => {


    const [employeeState, setState] = useState("Employee");
    const [openModal, setOpenModal] = useState(false);


    const toggleClose = () => {
        setOpenModal(!openModal);
    }
    

    function confirmEmail() {
        var email = document.getElementById('email').value
        var confirm = document.getElementById('confirm').value
        if(email != confirm) {
            alert('Email Not Matching, please enter the correct email.');
        }
    }

    return (
        <div>
            
            <p>Choose Employee Type</p>
            
            <select className={'roles'} name="Roles" value={employeeState} onChange={(e)=>{
                const selectedRole = e.target.value;
                setState(selectedRole);
            }}>
                <option value="Employee">Employee</option>
                <option value="Manager">Equipment Manager</option>
                <option value="Admin">Admin</option>
            </select>
            <br></br>
            <Button size={'small'} onClick={toggleClose}>Sign Up</Button>
            
            
            {employeeState === "Employee" && openModal && <Modal
                content={<>
                        <b>Employee</b>
                        <form>
                            <h5>Password: xxxxxxxxxx</h5>
                        </form>
                    </>}
                    handleClose={toggleClose}
            />}


            {employeeState === "Manager" && openModal && <Modal
                content={<>
                        <b>Equipment Manager</b>
                        <form>
                        <input
                            type={'email'}
                            className={'email'}
                            id={'email'}
                            placeholder={'Enter Email'}
                            required
                        /><br />
                        <input
                            type={'email'}
                            className={'email'}
                            id={'confirm'}
                            placeholder={'Confirm Email'}
                            required
                        /><br />
                        <input
                            type={'password'}
                            className={'password'}
                            placeholder={'Enter Password'}
                            required
                        /> <br />
                        <button onClick={confirmEmail}>Create User</button>
                    </form>
                    </>}
                    handleClose={toggleClose}
            />}


            {employeeState === "Admin" && openModal && <Modal
                content={<>
                        <b>Admin</b>
                        <form>
                        <input
                            type={'email'}
                            className={'email'}
                            id={'email'}
                            placeholder={'Enter Email'}
                            required
                        /><br />
                        <input
                            type={'email'}
                            className={'email'}
                            id={'confirm'}
                            placeholder={'Confirm Email'}
                            required
                        /><br />
                        <input
                            type={'password'}
                            className={'password'}
                            placeholder={'Enter Password'}
                            required
                        /> <br />
                        <button onClick={confirmEmail}>Create User</button>
                        </form>
                    </>}
                    handleClose={toggleClose}
            />}
            
        
        </div>
    )

}

export default SignUp