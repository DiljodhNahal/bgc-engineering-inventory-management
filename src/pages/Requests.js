import React from "react";
import Button from "../components/Button";
import Table from "../components/Table";

const Requests = () => {

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
                        <tr>
                            <td><a>Test</a></td>
                            <td>Testor</td>
                            <td>TestDate</td>
                            <td>TestDate2</td>
                            <td>
                                <Button size={'small'}>Approve</Button>
                            </td>
                            <td>
                                <Button size={'small'}>Deny</Button>
                            </td>
                        </tr>
                    </tbody>
                </React.Fragment>
            }
        ></Table>
    )
}

export default Requests