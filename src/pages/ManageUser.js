import React from 'react'
import Table from "../components/Table"

const ManageUser = () => {

    return (
        <Table
            content={
                <form>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </tbody>
                </form>
            }
        ></Table>
    )
}

export default ManageUser