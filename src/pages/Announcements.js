/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import '../styles/pages/Announcements.css'
import Table from "../components/Table"
import Button from '../components/Button'
import Modal from '../components/Modal';
const Announcements = () => {

    const [announcements, setAnnouncement] = useState('')
    const [modalStatus, setModalStatus] = useState(false)

    const toggleModal = () => {
        setModalStatus(!modalStatus)
    }

    const create = () => {
        setAnnouncement('')
    }
    return (
        <div id='mainBox'>
            <div id={'announcementBox'}>
            <Table
      content={
        <React.Fragment>
          <thead>
            <tr>
              <th></th>
              <th>Announcements</th>
            </tr>
          </thead>

          <tbody>
            <tr>
                <td></td>
                <td>setAnnouncement 1</td>
            </tr>
            <tr>
                <td></td>
                <td>setAnnouncement 2</td>
            </tr>
            <tr>
                <td></td>
                <td>setAnnouncement 3</td>
            </tr>
          </tbody>
          </React.Fragment>
      }
    ></Table>
            </div>
            <div id='createAnnouncement'>
            {modalStatus &&
                <Modal
                    content={
                        <form className={'createForm'}>
                            <h3>New Announcement</h3>
                            <textarea
                                type={'text'}
                                className={'text'}
                                id={'announcement'}
                                value={announcements}
                                onChange={event => setAnnouncement(event.target.value)}
                                placeholder={'announcement'}
                                required
                            />
                            <br />
                            <Button size={'small'} onClick={create}>Create</Button>
                        </form>
                    }
                    handleClose={toggleModal}
                />
            }
            <Button size={'small'} onClick={toggleModal}>New Announcement</Button>
            </div>
        </div>
        
    )

}

export default Announcements