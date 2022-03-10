import React from 'react'
import '../styles/components/Modal.css'

const Modal = ({ content, handleClose }) => {
    return (
        <div className={"signin-popup"}>
            <div className={"popup"}>
                <div className={"discard"} onClick={handleClose}>
                    &times;
                </div>
                <div className={'modalContent'}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Modal