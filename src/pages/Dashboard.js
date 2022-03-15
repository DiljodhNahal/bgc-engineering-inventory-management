import React from 'react'
import '../styles/pages/Dashboard.css'
import Button from '../components/Button'
import {useNavigate} from 'react-router-dom'



const Dashboard = () => {

    const navigation = useNavigate()

    return (
        <div>
            <div className={'btn-container'}>
                <div className={'btn-group'}>
                    <Button onClick={() => navigation('/create')}>Create Inventory</Button>
                    <Button onClick={() => navigation("/list")}>Manage Inventory</Button>
                    <Button>Pending Requests</Button>
                </div>
                <div className={'btn-group'}>
                    <Button>Signed Out Items</Button>
                    <Button onClick={() => navigation('/signup')}>Create Users</Button>
                    <Button onClick={() => navigation('/manageuser')}>Manage Users</Button>
                </div>
                <div className={'btn-group'}>
                    
                    <Button onClick={() => navigation('/announcements')}>Announcements</Button>
                </div>

            </div>
            
        </div>
    )

}

export default Dashboard