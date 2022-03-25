import React, { useState, useEffect } from "react"
import Button from "../components/Button";
import Table from "../components/Table";

const SignedOutItems = () => {
    
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
                            <th>Start Date</th>
                            <th>Return Date</th>
                            <th>Return</th>
                            <th>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                            {requests.map((request) => (request.isAccepted === false) ? (
                                null
                            ) :
                                <tr key={request.id}>
                                    <td>{request.name}</td>
                                    <td>{request.requestor}</td>
                                    <td>{request.requestDate}</td>
                                    <td>{request.returnDate}</td>
                                    <td>
                                        <Button size={'small'} onClick={() => {
                                            
                                        }}>
                                            Return
                                        </Button>
                                    </td>
                                    <td>
                                        <Button size={'small'} onClick={() => {
                                            
                                        }}>
                                            Edit
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

export default SignedOutItems