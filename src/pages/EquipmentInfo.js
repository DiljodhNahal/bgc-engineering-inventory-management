import React, { useState, useEffect } from "react";
import "../styles/pages/EquipmentInfo.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { reactLocalStorage } from 'reactjs-localstorage'

const EquipmentInfo = () => {
  let { id } = useParams();
  const navigation = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const [equipment, setEquipment] = useState();
  const [modalStatus, setModalStatus] = useState(false)
  const [requestor, setRequestor] = useState('')
  const [requestDate, setRequestDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [isAccepted, setIsAccepted] = useState(1)
  

  const toggleModal = () => {
    setModalStatus(!modalStatus)
  }

  const sendRequest = () => {
    console.log(equipment.id)
    let name = equipment.name
    let itemId = equipment.id
  
    try {
      const body = {
        itemId,
        name,
        requestor,
        requestDate,
        returnDate,
        isAccepted
      };
      fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then(() => {
          setModalStatus(false)
          alert("Request Sent")
          navigation('/search')
        });
    } catch (err) {
      console.error(err.message);
    }

      
  }



  useEffect(() => {
    fetch(`/api/search?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEquipment(data.results[0]);
        setLoaded(true);
      });
  }, []);

  if (!loaded) return null;

  return (

    <div id="mainBox">

      {modalStatus &&
        <Modal
          content={
            <form className={'createForm'}>
              <h3>Request {equipment.name}</h3>
              <h5>Enter Employee Name:</h5>
              <input
                type={'text'}
                className={'requesting-employee'}
                id={'requesting-employee'}
                value={requestor}
                onChange={event => setRequestor(event.target.value)}
                placeholder={'Enter Employee Name'}
                required
              />

              <h5>Enter Requested Date:</h5>
              <input
                type={'date'}
                id={'requestDate'}
                className={'requestDate'}
                value={requestDate}
                onChange={event => setRequestDate(event.target.value)}
                placeholder={'Requested Date'}
                required
              />

              <h5>Enter Requested Return Date:</h5>
              <input
                type={'date'}
                id={'returnDate'}
                className={'returnDate'}
                value={returnDate}
                onChange={event => setReturnDate(event.target.value)}
                placeholder={'Requested Return Date'}
                required
              />
              <br></br>
              <Button onClick={sendRequest} size={'small'} >Send Request</Button>
            </form>
          }
          handleClose={toggleModal}
        />
      }


      <img
        className={"camera"}
        src="https://cdn.thewirecutter.com/wp-content/media/2020/10/beginnerdslr2020-2048px-9793.jpg?auto=webp&quality=60&crop=1.91:1&width=1200"
        alt="Display"
      />

      <div className={"group"}>
        <ul>
          <h3>{equipment.name}</h3>
          <div id={"boxOne"}>
            <li className={"one"}>
              <label>
                <strong>Color:</strong>
              </label>{" "}
              {equipment.color}
            </li>
            <li className={"one"} id="serial">
              <label>
                <strong>Serial Number:</strong>
              </label>{" "}
              {equipment.serialNumber}
            </li>
          </div>

          <div id={"boxTwo"}>
            <li className={"two"}>
              <label>
                <strong>Price:</strong>
              </label>{" "}
              {equipment.price === null ? "" : "$" + equipment.price}
            </li>
            <li className={"two"}>
              <label>
                <strong>Purchase Date:</strong>
              </label>{" "}
              {moment.utc(equipment.purchaseDate).format("YYYY-MM-DD")}
            </li>
          </div>

          <div id={"boxThree"}>
            <li className={"three"}>
              <label>
                <strong>Barcode:</strong>
              </label>{" "}
              {equipment.barcode}
            </li>
          </div>

          <div id={"boxFour"}>
            <li className={"four"}>

              <label>
                <strong>Description:</strong>
              </label>

              <p>{equipment.description}</p>
            </li>
          </div>

          <button
            onClick={() => {
              navigation(`/manage/${id}`);
            }}
          >
            Edit Item Attributes
          </button>
          <button
            onClick={toggleModal}
          >
            Request This Item
          </button>
        </ul>
      </div>
    </div>
  );
};

export default EquipmentInfo;
