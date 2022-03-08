import React, {useState} from 'react'
import {useLocation} from 'react-router-dom';
import '../styles/pages/FormInput.css'
import {useNavigate} from 'react-router-dom'

const Create = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const [name, setName] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [color, setColor] = useState("");
    const [barcode, setBarcode] = useState(location.state.id);
   

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { name, description, color, serialNumber, price, purchaseDate, barcode};
            const response = await fetch("http://localhost:3001/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
        
          window.location = "/showData";
        } catch (err) {
          console.error(err.message);
        }
      };
  
    return (
                <form onSubmit={onSubmitForm}>
                    <h1>Create Inventory</h1>
                    <div class='mainBox'>
                        <div>
                            <div class='title'>
                                Item Name
                            </div>
                            <input 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name" type="text" name="name" placeholder="e.g. HP Camera" required/>
                        </div>
                    </div>

                    <div id='secondRow'>
                    <div class='smallBox'>
                        <div>
                            <div class='smallTitle'>
                                Purchase Date
                            </div>
                                <input 
                                value={purchaseDate}
                                onChange={e => setPurchaseDate(e.target.value)}
                                id="purchaseDate" type="date" name="purchaseDate" placeholder="e.g. 2020-07-13"/>
                        </div>
                    </div>
                    <div class='smallBox'>
                        <div>
                            <div class='smallTitle'>
                                Purchase Price
                            </div>
                                <input 
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                id="price" type="number" name="price" placeholder="e.g. 565.25"step="any"/>
                        </div>
                    </div>
                    </div>

                    <div class='descriptionBox'>
                        <div>
                            <div class='descriptionTitle'>
                                Item Description 
                            </div>
                                <textarea 
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                id="description" name="description" rows="5" cols="63" placeholder="e.g. HP Camera that is colored black "/>
                        </div>
                    </div>

                    <div id='thirdRow'>
                    <div class='smallBox'>
                        <div>
                            <div class='smallTitle'>
                                Serial Number
                            </div>
                                <input 
                                value={serialNumber}
                                onChange={e => setSerialNumber(e.target.value)}
                                id="serialNumber" type="text" name="serialNumber" placeholder="e.g. 76BD1S7F0GCBFB29"/>
                        </div>
                    </div>
                    <div class='smallBox'>
                        <div>
                            <div class='smallTitle'>
                                Item Color
                            </div>
                                <select 
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                name="color" id="color" required>
                                    <option value="Choose_Color">Choose Color</option>
                                    <option value="Red">Red</option>
                                    <option value="Green">Green</option>
                                    <option value="Orange">Orange</option>
                                    <option value="Yellow">Yellow</option>
                                    <option value="Black">Black</option>
                                    <option value="Pink">Pink</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Purple">Purple</option>
                                </select>
                        </div>
                    </div>
                    </div>
                    
                    <div id='fourthRow'>
                    <div class='scanBox'>
                        <div>
                            <div class='scanTitle'>
                                Barcode Number
                            </div>
                                <input 
                                value={location.state.id}
                                onChange={e => setBarcode(e.target.value)}
                                id='barcodeNum' type="number" placeholder="e.g. 7622300710613271" required/>
                        </div>
                    </div>
                    <div id='scanRow'>                         
                            <button id="scan-button" onClick={() => navigation('/scan')}>Scan Item</button>                        
                        </div>
                    </div>
                

                    <div id='createItem'>
                        <button id="Create-button" type="submit">Create Item</button>
                    </div>
            </form>
               
    )
}

export default Create;