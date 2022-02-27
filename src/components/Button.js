import React from 'react'

import '../styles/components/Button.css'

const Button = ({ children, onClick, size }) => {

    let sizeClass = 'button-md'
    if (size) {
        switch (size.toLowerCase()) {
            case 'large':
                sizeClass = 'button-lg'
                break
            case 'small':
                sizeClass = 'button-sm'
                break
        }
    }

    return (

        <div onClick={onClick} className={`button ${sizeClass}`}>
            {children}
        </div>

    )

}

export default Button   