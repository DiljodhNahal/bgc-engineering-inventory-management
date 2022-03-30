import React, { useState, useEffect } from "react";
import Table from '../components/Table';

const HomePage = () => {

    const [announcements, setAnnouncement] = useState([]);
    
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
                        </tr>
                    </thead>

                    <tbody>
                        {announcements.map((announcement) =>(

                        <tr key={announcement.id}>
                            <td>{announcement.announcement}</td>
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
export default HomePage