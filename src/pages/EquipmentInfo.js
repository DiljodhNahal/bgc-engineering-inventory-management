import React, { useState, useEffect } from "react";
import "../styles/pages/EquipmentInfo.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";

const EquipmentInfo = ({ authentication }) => {
  let { id } = useParams();
  const navigation = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const [equipment, setEquipment] = useState();
  const [modalStatus, setModalStatus] = useState(false)
  const [modal, setModal] = useState(false)
  const [requestor, setRequestor] = useState('')
  const [requestDate, setRequestDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [isAccepted, setIsAccepted] = useState(false)
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null)

  useEffect(() => {
    fetch('/api/google-key')
        .then(response => response.json())
        .then(data => {
          setToken(data.key)
        })
  }, [])

  const toggleModal = () => {
    setModalStatus(!modalStatus);
  };

  const toggleHigherModal = () => {
    setModal(!modal)
  }

  const sendRequest = () => {
    let name = equipment.name
    let itemId = equipment.id

    try {
      const body = {
        itemId,
        name,
        requestor,
        requestDate,
        returnDate,
        isAccepted,
      };
      fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then(data => {
          if (data.redirect === true) {
            alert("Request Sent");
            setModalStatus(false);
            setModal(false)
            setIsAccepted(false)
            navigation('/search')
          } else {
            alert('An Unexpected Error Has Occurred!')
          }
        })
    } catch (err) {
      console.error(err.message);
    }

  }

  const getUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const jsonData = await response.json();
      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const deleteItem = (id) => {

    try {
      fetch(`/api/info/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then(response => response.json())
        .then(data => {
          if (data.redirect === true) {
            navigation('/')
          } else {
            alert('An Unexpected Error Has Occurred!')
          }
        })
    } catch (error) {
      console.error(error.message);
    }
  }

  const getSearch = () => {
    fetch(`/api/search?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEquipment(data.results[0]);
        setLoaded(true);
      });
  }

  useEffect(() => {
    getSearch();
    getUsers();
  }, []);

  if (!loaded) return null;

  return (
    <div id="mainBox">
      {modalStatus && (
        <Modal
          content={
            <form className={'createForm'} onSubmit={sendRequest}>
              <h3>Request {equipment.name}</h3>
              <h5>Enter Employee Name:</h5>
              <select
                value={requestor}
                onChange={event => setRequestor(event.target.value)}
              >
                {users.map((user) => (user.accountType === 0) ? (
                  <option key={user.id}>{user.email}</option>
                ) :
                  null)}

              </select>

              <h5>Enter Requested Date:</h5>
              <input
                type={"date"}
                id={"requestDate"}
                className={"requestDate"}
                value={requestDate}
                onChange={(event) => setRequestDate(event.target.value)}
                placeholder={"Requested Date"}
                required
              />

              <h5>Enter Requested Return Date:</h5>
              <input
                type={"date"}
                id={"returnDate"}
                className={"returnDate"}
                value={returnDate}
                onChange={(event) => setReturnDate(event.target.value)}
                placeholder={"Requested Return Date"}
                required
              />
              <br></br>
              <button type="submit">Send Request</button>
            </form>
          }
          handleClose={toggleModal}
        />
      )}

      {modal && (
        <Modal
          content={
            <form className={'createForm'} onSubmit={sendRequest}>
              <h3>Request {equipment.name}</h3>
              <h5>Enter Employee Name:</h5>
              <select
                value={requestor}
                onChange={event => setRequestor(event.target.value)}
              >
                {users.map((user) => (user.accountType === 0 || 1 || 2) ? (
                  <option key={user.id}>{user.email}</option>
                ) :
                  null)}

              </select>


              <h5>Enter Requested Date:</h5>
              <input
                type={"date"}
                id={"requestDate"}
                className={"requestDate"}
                value={requestDate}
                onChange={(event) => setRequestDate(event.target.value)}
                placeholder={"Requested Date"}
                required
              />

              <h5>Enter Requested Return Date:</h5>
              <input
                type={"date"}
                id={"returnDate"}
                className={"returnDate"}
                value={returnDate}
                onChange={(event) => setReturnDate(event.target.value)}
                placeholder={"Requested Return Date"}
                required
              />
              <br></br>
              <button type="submit">Send Request</button>
            </form>
          }
          handleClose={toggleHigherModal}
        />
      )}

      <div style={{display: 'flex'}}>
        <img
            className={"camera"}
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${equipment.location}&zoom=16&size=600x300&maptype=roadmap&key=${token}`}
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
              <li className={"two"} id={"serial"}>
                <label>
                  <strong>Serial Number:</strong>
                </label>{" "}
                {equipment.serialNumber}
              </li>
            </div>

            <div id={"boxTwo"}>
              <li className={"one"}>
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

            <div id={"boxFour"}>
              <li className={"one"}>
                <label>
                  <strong>Item Type:</strong>
                </label>{" "}
                {equipment.type}
              </li>
              <li className={"two"} id={"category"}>
                <label>
                  <strong>Category:</strong>
                </label>{" "}
                {equipment.category}
              </li>
            </div>

            <div id={"boxFive"}>
              <li className={"one"}>
                <label>
                  <strong>Item Status:</strong>
                </label>{" "}
                {equipment.status}
              </li>
              <li className={"two"} id={"productCode"}>
                <label>
                  <strong>Product Code:</strong>
                </label>{" "}
                {equipment.productCode}
              </li>
            </div>

            <div id={"boxSix"}>
              <li className={"one"}>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                {equipment.location}
              </li>
              <li className={"two"} id={"projectNumber"}>
                <label>
                  <strong>Project Number:</strong>
                </label>{" "}
                {equipment.projectNumber}
              </li>
            </div>

            <div id={"boxSix"}>
              <li className={"one"}>
                <label>
                  <strong>Warranty Expiry:</strong>
                </label>{" "}
                {equipment.warrantyExpiryDate}
              </li>
            </div>

            <div id={"boxSeven"}>
              <li className={"one"}>
                <label>
                  <strong>Barcode:</strong>
                </label>{" "}
                {equipment.barcode}
              </li>
            </div>

            <div id={"boxThree"}>
              <li className={"one"}>
                <label>
                  <strong>Description:</strong>
                </label>

                <p>{equipment.description}</p>
              </li>
            </div>
            {authentication.status === true &&
            authentication.user.accountType !== 0 && (
                <>
                  <button
                      className="eqbutton"
                      onClick={() => {
                        navigation(`/manage/${id}`);
                      }}
                  >
                    Edit Item
                  </button>
                  <button
                      className="eqbutton"
                      onClick={() => {
                        deleteItem(id)
                      }}
                  >
                    Delete Item
                  </button>
                  <button
                      className="eqbutton"
                      onClick={() => {
                        setRequestor(authentication.user.email)
                        setIsAccepted(true)
                        toggleHigherModal()
                      }}
                  >
                    Request Item
                  </button>

                </>
            )}

            {authentication.status === true &&
            authentication.user.accountType === 0 && (
                <button className="eqbutton"
                        onClick={toggleModal}
                >
                  Request Item
                </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EquipmentInfo;
