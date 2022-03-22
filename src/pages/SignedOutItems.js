import React from "react";
import Button from "../components/Button";
import Table from "../components/Table";

const SignedOutItems = () => {

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
                            <th>Location</th>
                            <th>Sign Out Date</th>
                            <th>Expected Return Date</th>
                            <th>Return Item</th>
                            <th>Edit Item</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Test</td>
                            <td>Test</td>
                            <td>123Test123</td>
                            <td>123</td>
                            <td>TestDate</td>
                            <td>123123123</td>
                            <td>123</td>
                            <td>TestLocation</td>
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
                </form>
            }
        ></Table>
    )
}

export default SignedOutItems