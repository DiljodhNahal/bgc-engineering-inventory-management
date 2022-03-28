import React, { useState, useEffect } from "react"
import Button from "../components/Button";
import Table from "../components/Table";

const Requests = () => {

    const [requests, setRequests] = useState([]);

    const getRequests = async () => {
        try {
            const response = await fetch("/api/requests");
            const jsonData = await response.json();
            setRequests(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const approveRequest = async (id) => {
        try {
            const response = await fetch(
                `/api/approve/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            const jsonData = await response.json();
            if (jsonData.status === 200) {
                window.location.reload(true)
            }
        } catch (err) {
            console.error(err);
        }
    }

    const denyRequest = (id) => {
        try {
            fetch(
                `/api/requests/delete/${id}`,
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    window.location.reload(true)
                    console.log(response)
                })
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getRequests();
    }, []);

    return (
        <Table
            content={
                <React.Fragment>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Requestor</th>
                            <th>Requested Sign Out Date</th>
                            <th>Requested Return Date</th>
                            <th>Approve Request</th>
                            <th>Deny Request</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((request) => (request.isAccepted === true) ? (
                            null
                        ) :
                            <tr key={request.id}>
                                <td>{request.name}{request.isAccepted}</td>
                                <td>{request.requestor}</td>
                                <td>{request.requestDate}</td>
                                <td>{request.returnDate}</td>
                                <td>
                                    <Button size={'small'} onClick={() => approveRequest(request.id)}>
                                        Approve
                                    </Button>
                                </td>
                                <td>
                                    <Button size={'small'} onClick={() => {
                                        denyRequest(request.id)
                                    }}>
                                        Deny
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </React.Fragment>
            }
        ></Table>
    )
}

export default Requests