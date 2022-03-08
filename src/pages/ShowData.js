import React, {useState, useEffect} from 'react'
import '../styles/pages/ShowData.css'
const ShowData = () => {

    const [items, setItems] = useState([]);

    const getItems = async () => {
        try {
          const response = await fetch("http://localhost:3001/items");
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
        <table class="itemsTable">
        
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Color</th>
            <th>Serial Number</th>
            <th>Price</th>
            <th>Purchase Date</th>
            <th>Barcode Number</th>
          </tr>
        </thead>

        <tbody>
          {items.map(item => (

            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.color}</td>
              <td>{item.serialNumber}</td>
              <td>{item.price}</td>
              <td>{item.purchaseDate}</td>
              <td>{item.barcode}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
               
    )
}

export default ShowData;