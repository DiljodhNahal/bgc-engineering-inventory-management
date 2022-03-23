import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useParams } from "react-router-dom";
import Table from "../components/Table";
import Modal from "../components/Modal";

const ListItems = () => {
  const [items, setItems] = useState([]);
  let { id } = useParams();
  const navigation = useNavigate();
  const [description, setDescription] = useState("");

  const [modalStatus, setModalStatus] = useState(false);

  const toggleModal = () => {
    setModalStatus(!modalStatus);
  };

  const getItems = async () => {
    try {
      const response = await fetch("/items");
      const jsonData = await response.json();

      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
        {modalStatus &&
                <Modal
                    content={
                        <form className={'createForm'}>
                           <h1>{description}</h1>
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
              <th>Description</th>
              <th>Color</th>
              <th>Serial Number</th>
              <th>Price</th>
              <th>Purchase Date</th>
              <th>Barcode Number</th>
              <th>Type</th>
              <th>Category</th>
              <th>Status</th>
              <th>Product Code</th>
              <th>Location</th>
              <th>Project Number</th>
              <th>Warranty Expiry Date</th>
              <th>Edit Items</th>
              <th>Delete Items</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
               
                <td>{item.name}</td>
                <td>
                  <button onClick={() => {
                      setDescription(item.description);
                      toggleModal();
                  }}>View Description</button>
                </td>
                <td>{item.color}</td>
                <td>{item.serialNumber}</td>
                <td>{item.price === null ?  "" : "$" + (Math.round(item.price * 100) / 100).toFixed(2)}</td>
                <td>{moment.utc(item.purchaseDate).format("YYYY-MM-DD")}</td>
                <td>{item.barcode}</td>
                <td>{item.type}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>{item.productCode}</td>
                <td>{item.location}</td>
                <td>{item.projectNumber}</td>
                <td>
                  {moment.utc(item.warrantyExpiryDate).format("YYYY-MM-DD")}
                </td>
                <td>
                  <button
                    onClick={() => {
                      navigation(`/manage/${item.id}`);
                    }}
                  >
                    Edit
                  </button>
                </td>
               
                <td>
                <form>
                  <button
                    onClick={() => {
                      try {
                        fetch(`/api/info/${item.id}`, {
                          method: "POST",
                          headers: { 'Content-Type': 'application/json' },
                        })
                        .then(response => {
                        
                          window.location.reload(true)
                          console.log(response)
                      })
                      } catch (error) {
                        console.error(error.message);
                      }
                    }}
                  >
                    Delete
                  </button>
                  </form>
                </td>
              
              </tr>
            ))}
          </tbody>
          </React.Fragment>
      }
    ></Table>
    </div>
  );
};

export default ListItems;
