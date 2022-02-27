import React from 'react'
import '../styles/components/Modal.css'

const Modal = ({ content, handleClose }) => {
    return (
        <div className="signin-popup">
            <div className="popup">
                <span className="discard" onClick={handleClose}>
                    x
                </span>
                {content}
            </div>
        </div>
    )
}

export default Modal