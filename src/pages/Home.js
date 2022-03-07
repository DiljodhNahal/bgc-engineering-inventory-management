import React, { useEffect } from 'react'

const Home = () => {
    
    useEffect(() => {
        fetch(`/api/autheticated`)
            .then(response => {
                response.json()
            })
            .then(data => {
                console.log(data)
            })
    })

    return (
        <div>
            HOME PAGE
        </div>
    )

}

export default Home