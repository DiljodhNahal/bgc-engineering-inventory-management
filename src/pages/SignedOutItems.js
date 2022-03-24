import React from "react";
import Button from "../components/Button";
import Table from "../components/Table";

const SignedOutItems = () => {

    return (
        <Table
            content={
                <React.Fragment>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sign Out Date</th>
                            <th>Expected Return Date</th>
                            <th>Return Item</th>
                            <th>Edit Item</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><a>Test</a></td>
                            <td>TestDate2</td>
                            <td>TestDate3</td>
                            <td>
                                <Button size={'small'}>Return</Button>
                            </td>
                            <td>
                                <Button size={'small'}>Edit</Button>
                            </td>
                        </tr>
                    </tbody>
                </React.Fragment>
            }
        ></Table>
    )
}

export default SignedOutItems