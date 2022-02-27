import React from 'react'

import '../styles/components/Button.css'

const Button = ({ children, onClick }) => {

    return (

        <div onClick={onClick} className={'button'}>
            {children}
        </div>

    )

}

export default Button   