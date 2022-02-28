import React from 'react'
import { useParams, Link } from 'react-router-dom'
import '../styles/pages/Error.css'

const Error = () => {

    let { code } = useParams()

    return (
        <div className={'errorBody'}>

            <div className={'errorContent'}>

                <div className={'errorTitle'}>
                    <h2>Oh No! It Looks Like You Had An Oopsie!</h2>
                </div>

                <div className={'errorCode'}>
                    {code}
                </div>

                <div className={'goBack'}>
                    <Link to={'/'}>Go Back Home</Link>
                </div>

            </div>

        </div>
    )

}

export default Error