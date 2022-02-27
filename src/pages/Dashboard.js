import React from 'react'
import '../styles/Dashboard.css'
import Button from '../components/Button'
import {useNavigate} from 'react-router-dom'



const Dashboard = () => {

    const navigation = useNavigate();


    return (
        <div>
            Dashboard page
        <div className={'btn-container'}>
            <div className={'btn-group-top'}>
                <Button>Create Inventory</Button>
                <Button> Manage Inventory</Button>
                <Button>Pending Requests</Button>
            </div>
            <div className={'btn-group-bot'}>
                <Button>Signed Out Items</Button>
                <Button onClick={() => navigation('/signup')}>Create Users</Button>
                <Button>Manage Users</Button>
            </div>
                
        </div>
            
        </div>
    )

}

export default Dashboard