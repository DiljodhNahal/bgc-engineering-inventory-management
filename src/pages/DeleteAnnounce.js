import React, { useState, useEffect } from "react";
import '../styles/pages/Home.css'
import Table from '../components/Table';


const DeleteAnnounce = () => {

    const [announcements, setAnnouncement] = useState([]);
   
    const toDelete = (id) => {
        
        try {
            fetch(
                `/api/announcements/delete/${id}`,
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    window.location.reload(true)
                    console.log(response)
                })
        } catch (exception) {
            console.error(exception.message)
        }
    }
    const getAnnouncements = async () => {
        try {
            const response = await fetch("/api/announcements");
            const jsonData = await response.json();
            setAnnouncement(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getAnnouncements();
    }, []);
    return (
    <div>
        <div id={'announcementBox'}>
        <Table content={
        <React.Fragment>
            <thead>
                <tr>
                    <th>Announcements</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
            {announcements.map((announcement) =>(
                <tr key={announcement.id}>
                    <td></td>
                    <td>{announcement.announcement}</td>
                    <td>
                        <button onClick={() => {
                        toDelete(announcement.id)}}>
                        
                        Delete
                        </button>
                    </td>
                </tr>
                ))}   
            </tbody>
            </React.Fragment>
        }
        ></Table>
        </div>
    </div>
    )
}

export default DeleteAnnounce