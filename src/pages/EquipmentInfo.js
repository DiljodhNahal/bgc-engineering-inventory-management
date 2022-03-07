import React from 'react'
import '../styles/pages/EquipmentInfo.css'
const EquipmentInfo = () => {

    return (
                <div id='mainBox'>
                    
                            <img className={'camera'} src="https://cdn.thewirecutter.com/wp-content/media/2020/10/beginnerdslr2020-2048px-9793.jpg?auto=webp&quality=60&crop=1.91:1&width=1200" alt="Display" />
                    
                    
                    <div class="group">
                        
                        <ul>
                        <h3>Camera Name</h3>
                            <div id='boxOne'>
                            <li className={'one'}><label><strong>Color:</strong></label> Black</li> 
                            <li className={'one'} id='serial'><label><strong>Serial Number:</strong></label> 5437831</li>
                            </div>

                            <div id='boxTwo'>
                            <li className={'two'}><label><strong>Price:</strong></label> $300.00</li>
                            <li className={'two'}><label><strong>Purchase Date:</strong></label> 2022-12-6</li>
                            </div>
                            
                            <div id={'boxThree'}>
                            <li className={'three'}><label><strong>Barcode:</strong></label> 0 36000 29145 2</li>
                            </div>
                            
                            <div id={'boxFour'}>
                            <li className={'four'}><label><strong>Description:</strong></label><p> Description of the camera here Description of the camera here Description of the camera here Description of the camera here Description of the camera here Description of the camera here Description of the camera here Description of the camera here Description of the camera here Description of the camera here Description of the camera here Description
                                 of the camera here Description of the camera here Des
                                 cription of the camera here</p></li>
                            </div>
                        </ul>
                    </div>  
 
                </div>      
                )
            }
        
    
export default EquipmentInfo