import React from "react";
import Button from "../components/Button";
import Table from "../components/Table";

const Requests = () => {

    return (
        <Table
            content={
                <form>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Color</th>
                            <th>Serial Number</th>
                            <th>Price</th>
                            <th>Purchase Date</th>
                            <th>Barcode Number</th>
                            <th>Product Code</th>
                            <th>Requestor</th>
                            <th>Requested Sign Out Date</th>
                            <th>Requested Return Date</th>
                            <th>Approve Request</th>
                            <th>Deny Request</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Test</td>
                            <td>Test</td>
                            <td>123Test123</td>
                            <td>123</td>
                            <td>123123123</td>
                            <td>123</td>
                            <td>123123</td>
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
                </form>
            }
        ></Table>
    )
}

export default Requests