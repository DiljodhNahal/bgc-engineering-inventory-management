import React, { useState, useEffect } from "react";
import '../styles/pages/Home.css'
import Button from '../components/Button'
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
                    <td>{announcement.announcement}</td>
                    <td>
                        <Button size={"small"} onClick={() => {
                        toDelete(announcement.id)}}>
                        
                        Delete
                        </Button>
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