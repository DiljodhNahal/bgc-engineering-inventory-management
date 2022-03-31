import React, { useState, useEffect } from "react"
import Button from "../components/Button";
import Table from "../components/Table";
import moment from "moment";
import Modal from "../components/Modal";
import { useParams } from "react-router-dom";



const SignedOutItems = () => {
    
    const [requests, setRequests] = useState([]);
    const [requestor, setRequestor] = useState('')
    const [requestDate, setRequestDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [modalStatus, setModalStatus] = useState(false)
    let { id } = useParams();

    const toggleModal = () => {
        setModalStatus(!modalStatus)
    }
    
    const completeEdit = (id) => {
        console.log(id)
        /*try {
            
          const body = {
            requestor,
            requestDate,
            returnDate,
            id,
          };
          fetch(`/api/signedout/edit/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then(() => window.location.reload(true));
        } catch (err) {
          console.error(err.message);
        }*/
    };
    
    const getRequests = async () => {
        try {
            const response = await fetch("/api/requests");
            const jsonData = await response.json();
            setRequests(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const returnItem = (id) => {
        try {
            fetch(
                `/api/signedout/return/${id}`,
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    alert('Item successfully returned')
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
        <div>                        
           
        {modalStatus &&
                <Modal
                content={
                    
                    <form className={'createForm'} onSubmit={() => completeEdit(id)}>
                    <h3>Edit </h3>
                    <h5>Enter Employee Name:</h5>
                    <input
                        type={'text'}
                        className={'requesting-employee'}
                        id={'requesting-employee'}
                        value={requestor}
                        name={'requestor'}
                        onChange={event => setRequestor(event.target.value)}
                        /*placeholder={request.name}*/
                        required
                    />
        
                    <h5>Enter Requested Date:</h5>
                    <input
                        type={'date'}
                        id={'requestDate'}
                        className={'requestDate'}
                        name={'requestDate'}
                        value={requestDate}
                        onChange={event => setRequestDate(event.target.value)}
                        /*placeholder={request.requestDate}*/
                        required
                    />
        
                    <h5>Enter Requested Return Date:</h5>
                    <input
                        type={'date'}
                        id={'returnDate'}
                        className={'returnDate'}
                        name={'returnDate'}
                        value={returnDate}
                        onChange={event => setReturnDate(event.target.value)}
                        /*placeholder={request.returnDate}*/
                        required
                    />
                    <br></br>
                    <Button  size={'small'} type="submit" >Finish Edit</Button>
                    <button type="submit">edit</button>
                    </form>
                }
                handleClose={toggleModal}
                />
            }

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
                                    <td>{moment.utc(request.requestDate).format("YYYY-MM-DD")}</td>
                                    <td>{moment.utc(request.returnDate).format("YYYY-MM-DD")}</td>
                                    <td>
                                        <Button size={'small'} onClick={() => {
                                        returnItem(request.id)
                                    }}>
                                            Return
                                        </Button>
                                    </td>
                                    <td>
                                        <Button size={'small'} onClick={toggleModal}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                </React.Fragment>
            }
        ></Table>
        </div>
    )
}

export default SignedOutItems