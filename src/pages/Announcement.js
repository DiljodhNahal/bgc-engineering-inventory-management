import React, { useState } from 'react';
import Button from '../components/Button';
import '../styles/pages/Announcements.css'

const Announcement = () => {
    const [announcement, setAnnouncement] = useState()

    const create = async (e) => {
      e.preventDefault();
      try {
          const body = {
            announcement
          };
          fetch("/api/announce", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then(() =>{
          window.location.reload(true)
          alert("Announcement Made")
        });
    
      } catch (err) {
          console.error(err.message);
      }
  }
  
  return (
      <div>
        <div id='createAnnouncement'>
          <h3 className='title'>New Announcement</h3>
          <form onSubmit={create}>
            <textarea
              type={'text'}
              className={'text'}
              id={'announcement'}
              value={announcement}
              onChange={event => setAnnouncement(event.target.value)}
              placeholder={'Announcements'}
              required/>
            <br />
              <Button id={"createBtn"} onClick={create} size={'large'} >Create Announcement</Button>
                                 
          </form>
         </div>
      </div>  
    )
}
export default Announcement

