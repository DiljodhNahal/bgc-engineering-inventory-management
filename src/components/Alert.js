import React, { useState } from 'react'


const Alert = ({ text, type }) => {

    let alertType
    const [style, setStyle] = useState({})

    switch (type.toLowerCase()) {
        case 'error':
            alertType = 'alert-error'
            break
        case 'warning':
            alertType = 'alert-warning'
            break
        default:
            alertType = 'alert-success'
    }

    const close = () => {
       setStyle({display: 'none'})
    }

    return (
        <div className={`alert ${alertType}`} style={style}>
            <div className={'alert-text'}>{text}</div>
            <div className={'alert-close'} onClick={close}>&times;</div>
        </div>
    )

}


export default Alert   