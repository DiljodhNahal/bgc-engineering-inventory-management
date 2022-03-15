import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Table from "../components/Table";

const ListItems = () => {
  const [items, setItems] = useState([]);
  const navigation = useNavigate();

  const toComponentB = () => {
    navigation("/manage", {
      state: {
        name: items.name,
        color: items.color,
        serialNumber: items.serialNumber,
        price: items.price,
        purchaseDate: items.purchaseDate,
        barcode: items.barcode,
        description: items.description,
        type: items.type,
        category: items.category,
        statusItem: items.status,
        productCode: items.productCode,
        location: items.location,
        projectNumber: items.projectNumber,
        warrantyExpiryDate: items.warrantyExpiryDate,
      },
    });
  };
 
  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/items");
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
    <Table
      content={
        <form>
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
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.color}</td>
                <td>{item.serialNumber}</td>
                <td>{item.price}</td>
                <td>{item.purchaseDate}</td>
                <td>{item.barcode}</td>
                <td>{item.type}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>{item.productCode}</td>
                <td>{item.location}</td>
                <td>{item.projectNumber}</td>
                <td>{item.warrantyExpiryDate}</td>
                <td>
                  <button
                    onClick={() => {
                      toComponentB();
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </form>
      }
    ></Table>
  );
};

export default ListItems;
