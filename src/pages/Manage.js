import React, { useState, useEffect } from "react";
import "../styles/pages/Create.css";
import { useParams } from "react-router-dom";


const Manage = () => {
  const [loaded, setLoaded] = useState(false);
  const [equipment, setEquipment] = useState();
  let { id } = useParams();

  const [name, setName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [color, setColor] = useState("");
  const [barcode, setBarcode] = useState();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [productCode, setProductCode] = useState();
  const [locationItem, setLocationItem] = useState("");
  const [warrantyExpiryDate, setWarrantyExpiryDate] = useState();
  const [projectNumber, setProjectNumber] = useState();
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`/api/search?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEquipment(data.results[0]);
        setLoaded(true);
      });
  }, []);

  if (!loaded) return null;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name,
        description,
        color,
        serialNumber,
        price,
        purchaseDate,
        barcode,
        type,
        category,
        status,
        productCode,
        locationItem,
        projectNumber,
        warrantyExpiryDate,
      };
      fetch(`/info/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then(() => window.location.replace(`/info/${id}`));
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <form onSubmit={onSubmitForm}>
      <h1>Manage Inventory</h1>
      <div className="mainBox">
        <div>
          <div className="title">Item Name</div>
          <input

            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            name="name"
            placeholder={equipment.name}
            required
          />
        </div>
      </div>

      <div id="secondRow">
        <div className="smallBox">
          <div>
            <div className="smallTitle">Purchase Date</div>
            <input
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              id="purchaseDate"
              type="date"
              name="purchaseDate"
              placeholder={equipment.purchaseDate}
              required
            />
          </div>
        </div>
        <div className="smallBox">
          <div>
            <div className="smallTitle">Purchase Price</div>
            <input

              onChange={(e) => setPrice(e.target.value)}
              id="price"
              type="number"
              name="price"
              placeholder={equipment.price}
              step="any"
            />
          </div>
        </div>
      </div>

      <div className="descriptionBox">
        <div>
          <div className="descriptionTitle">Item Description</div>
          <textarea

            onChange={(e) => setDescription(e.target.value)}
            id="description"
            name="description"
            rows="5"
            cols="63"
            placeholder={equipment.description}
          />
        </div>
      </div>

      <div id="thirdRow">
        <div className="smallBox">
          <div>
            <div className="smallTitle">Serial Number</div>
            <input

              onChange={(e) => setSerialNumber(e.target.value)}
              id="serialNumber"
              type="text"
              name="serialNumber"
              placeholder={equipment.serialNumber}
            />
          </div>
        </div>
        <div className="colorBox">
          <div>
            <div className="colorTitle">Item Color</div>
            <select
              onChange={(e) => setColor(e.target.value)}
              name="color"
              id="color"
              required
              placeholder={equipment.color}
            >
              <option value="">Choose Color</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Brown">Brown</option>
              <option value="Black">Black</option>
              <option value="Pink">Pink</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
            </select>
          </div>
        </div>
      </div>

      <div id="secondRow">
        <div className="smallBox">
          <div>
            <div className="smallTitle">Item Type</div>
            <input

              onChange={(e) => setType(e.target.value)}
              id="type"
              type="text"
              name="type"
              placeholder={equipment.type}
            />
          </div>
        </div>
        <div className="smallBox">
          <div>
            <div className="smallTitle">Category</div>
            <input

              onChange={(e) => setCategory(e.target.value)}
              id="category"
              type="text"
              name="category"
              placeholder={equipment.category}
            />
          </div>
        </div>
      </div>

      <div className="descriptionBox">
        <div>
          <div className="descriptionTitle">Item Status</div>
          <textarea
            onChange={(e) => setStatus(e.target.value)}
            id="status"
            name="status"
            rows="1"
            cols="63"
            placeholder={equipment.status}
          />
        </div>
      </div>

      <div id="secondRow">
        <div className="smallBox">
          <div>
            <div className="smallTitle">Product Code</div>
            <input
              onChange={(e) => setProductCode(e.target.value)}
              id="productCode"
              type="text"
              name="productCode"
              placeholder={equipment.productCode}
            />
          </div>
        </div>
        <div className="smallBox">
          <div>
            <div className="smallTitle">Item Location</div>
            <input
              onChange={(e) => setLocationItem(e.target.value)}
              id="location"
              type="text"
              name="location"
              placeholder={equipment.location}
            />
          </div>
        </div>
      </div>

      <div id="secondRow">
        <div className="smallBox">
          <div>
            <div className="smallTitle">Project Number</div>
            <input
              onChange={(e) => setProjectNumber(e.target.value)}
              id="projectNumber"
              type="number"
              name="projectNumber"
              placeholder={equipment.projectNumber}
            />
          </div>
        </div>
        <div className="smallBox">
          <div>
            <div className="smallTitle">Warranty Expiry Date</div>
            <input
              value={warrantyExpiryDate}
              onChange={(e) => setWarrantyExpiryDate(e.target.value)}
              id="warrantyExpireDate"
              type="date"
              name="warrantyExpireDate"
              placeholder={equipment.warrantyExpiryDate}
              required
            />
          </div>
        </div>
      </div>

      <div id="fourthRow">
        <div className="scanBox">
          <div>
            <div className="scanTitle">Barcode Number</div>
            <input
              onChange={(e) => setBarcode(e.target.value)}
              id="barcodeNum"
              type="number"
              placeholder={equipment.barcode}
              required
            />
          </div>
        </div>
        <div id="scanRow">
          <button id="scan-button" onClick={() => { }}>
            Rescan Item
          </button>
        </div>
      </div>

      <div id="createItem">
        <button id="Create-button" type="submit">
          Update Item
        </button>
      </div>
    </form>
  );
};

export default Manage;
