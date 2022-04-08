import React from 'react'

import '../styles/components/SearchResult.css'
import { useNavigate } from 'react-router-dom'

const SearchResult = ({ result }) => {

    const navigation = useNavigate()

    const onClick = () => {
        navigation(`/info/${result.id}`)
    }

    return (

        <div className={'resultCol'}>

            <div className={'searchResult'} onClick={onClick}>

                <div style={{ fontSize: 24 }}>{result.name}</div>

                <div style={{ padding: 8 }}>Barcode: {result.barcode}</div>

            </div>

        </div>

    )

}

export default SearchResult