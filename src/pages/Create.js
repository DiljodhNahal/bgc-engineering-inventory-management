import React, { useState } from "react";
import "../styles/pages/Create.css";
import moment from "moment";


const Create = () => {
  const [name, setName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [serialNumber, setSerialNumber] = useState();
  const [color, setColor] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [productCode, setProductCode] = useState();
  const [location, setLocation] = useState();
  const [warrantyExpiryDate, setWarrantyExpiryDate] = useState();
  const [projectNumber, setProjectNumber] = useState();
  const [status, setStatus] = useState();

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
        location,
        projectNumber,
        warrantyExpiryDate,
      };
      fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => window.location.replace(`/info/${data.id}`));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <h1>Create Inventory</h1>
      <div className="mainBox">
        <div>
          <div className="title">Item Name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            name="name"
            placeholder="e.g. HP Camera"
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
              placeholder="e.g. 2020-07-13"
              required
            />
          </div>
        </div>
        <div className="smallBox">
          <div>
            <div className="smallTitle">Purchase Price</div>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              type="number"
              name="price"
              placeholder="e.g. 565.25"
              step="any"
            />
          </div>
        </div>
      </div>

      <div className="descriptionBox">
        <div>
          <div className="descriptionTitle">Item Description</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            name="description"
            rows="5"
            cols="63"
            placeholder="e.g. HP Camera that is colored black "
          />
        </div>
      </div>

      <div id="thirdRow">
        <div className="smallBox">
          <div>
            <div className="smallTitle">Serial Number</div>
            <input
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              id="serialNumber"
              type="text"
              name="serialNumber"
              placeholder="e.g. 76BD1S7F0GCBFB29"
            />
          </div>
        </div>
        <div className="colorBox">
          <div>
            <div className="colorTitle">Item Color</div>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              name="color"
              id="color"
              required
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
              value={type}
              onChange={(e) => setType(e.target.value)}
              id="type"
              type="text"
              name="type"
              placeholder="e.g. Mining"
            />
          </div>
        </div>
        <div className="smallBox">
          <div>
            <div className="smallTitle">Category</div>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              type="text"
              name="category"
              placeholder="e.g. Mining equipment"
            />
          </div>
        </div>
      </div>

      <div className="descriptionBox">
        <div>
          <div className="descriptionTitle">Item Status</div>
          <textarea
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            id="status"
            name="status"
            rows="1"
            cols="63"
            placeholder="e.g. Item returned on 2022/03/11 back to Vancouver location"
          />
        </div>
      </div>

      <div id="secondRow">
        <div className="smallBox">
          <div>
            <div className="smallTitle">Product Code</div>
            <input
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              id="productCode"
              type="text"
              name="productCode"
              placeholder="e.g. 73HD72G6"
            />
          </div>
        </div>
        <div className="smallBox">
          <div>
            <div className="smallTitle">Item Location</div>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              id="location"
              type="text"
              name="location"
              placeholder="e.g. 105 Avenue, Surrey, BC, Canada"
            />
          </div>
        </div>
      </div>

      <div id="secondRow">
        <div className="smallBox">
          <div>
            <div className="smallTitle">Project Number</div>
            <input
              value={projectNumber}
              onChange={(e) => setProjectNumber(e.target.value)}
              id="projectNumber"
              type="number"
              name="projectNumber"
              placeholder="e.g. 28472742"
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
              placeholder="e.g. 2020-07-13"
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
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              id="barcodeNum"
              type="number"
              placeholder="e.g. 7622300710613271"
              required
            />
          </div>
        </div>
        <div id="scanRow">
          <button id="scan-button" onClick={() => {}}>
            Scan Item
          </button>
        </div>
      </div>

      <div id="createItem">
        <button id="Create-button" type="submit">
          Create Item
        </button>
      </div>
    </form>
  );
};

export default Create;
