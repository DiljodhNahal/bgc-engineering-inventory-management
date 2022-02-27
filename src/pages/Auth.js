import React, { useState } from 'react'
import Modal from '../components/Modal';

const Auth = () => {
    const [employee, setEmployee] = useState(false);
    const [nonEmployee, setNonEmployee] = useState(false);

    const toggleEmployee = () => {
        setEmployee(!employee);
    }

    const toggleNonEmployee = () => {
        setNonEmployee(!nonEmployee);
    }

    return (
        <div className='auth-look'>
            <input
                type="button"
                value="Employee"
                onClick={toggleEmployee}
            /><br />
            <input
                type="button"
                value="Equipment Manager/Administrator"
                onClick={toggleNonEmployee}
            />
            {employee && <Modal
                content={<>
                    <b>Employee</b>
                    <form>
                        <input
                            type={'password'}
                            className={'password'}
                            placeholder={'Password'}
                            required
                        /><br />
                        <button>Log In</button>
                    </form>
                </>}
                handleClose={toggleEmployee}
            />}
            {nonEmployee && <Modal
                content={<>
                    <b>Equipment Manager / Administrator</b>
                    <form>
                        <input
                            type={'email'}
                            className={'email'}
                            placeholder={'Email'}
                            required
                        /><br />
                        <input
                            type={'password'}
                            className={'password'}
                            placeholder={'Password'}
                            required
                        /> <br />
                        <button>Log In</button>
                    </form>
                </>}
                handleClose={toggleNonEmployee}
            />}
        </div>
    )
}

export default Auth