import React, { useState, useEffect } from "react";
import "../styles/pages/EquipmentInfo.css";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

const EquipmentInfo = () => {
  let { id } = useParams();
  const navigation = useNavigate();

  const toComponentB = () => {
    navigation("/manage", {
      state: {
        name: equipment.name,
        color: equipment.color,
        serialNumber: equipment.serialNumber,
        price: equipment.price,
        purchaseDate: equipment.purchaseDate,
        barcode: equipment.barcode,
        description: equipment.description,
        type: equipment.type,
        category: equipment.category,
        statusItem: equipment.status,
        productCode: equipment.productCode,
        location: equipment.location,
        projectNumber: equipment.projectNumber,
        warrantyExpiryDate: equipment.warrantyExpiryDate,
      },
    });
  };

  const [loaded, setLoaded] = useState(false);
  const [equipment, setEquipment] = useState();

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
              ${equipment.price}
            </li>
            <li className={"two"}>
              <label>
                <strong>Purchase Date:</strong>
              </label>{" "}
              {equipment.purchaseDate}
            </li>
          </div>

          <div id={"boxFour"}>
          <li className={"one"}>
              <label>
                <strong>Item Type:</strong>
              </label>{" "}
              {equipment.type}
            </li>
            <li className={"two"}id={"category"}>
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
            <li className={"two"}id={"productCode"}>
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
            <li className={"two"}id={"projectNumber"}>
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

          <button
            onClick={() => {
              toComponentB();
            }}
          >
            Edit Item Attributes
          </button>
        </ul>
      </div>
    </div>
  );
};

export default EquipmentInfo;
