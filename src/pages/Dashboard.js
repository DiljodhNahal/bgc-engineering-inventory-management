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
                    <Button onClick={() => navigation('/requests')}>Pending Requests</Button>
                    <Button onClick={() => navigation('/signedoutitems')}>Signed Out Items</Button>
                </div>
                <div className={'btn-group'}>
                    <Button onClick={() => navigation('/signup')}>Create Users</Button>
                    <Button onClick={() => navigation('/manageuser')}>Manage Users</Button>
                    <Button onClick={() => navigation('/announcements')}>New Announcements</Button>
                </div>
                <div className={'btn-group'}>
                <Button onClick={() => navigation('/announcement')}>Manage Announcements</Button>
                    
                </div>

            </div>
            
        </div>
    )

}

export default Dashboard