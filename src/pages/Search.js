import React, { useState } from 'react'

import SearchBar from '../components/SearchBar'
import SearchResult from '../components/SearchResult'
import '../styles/pages/Search.css'

const Search = () => {

    const [results, setResults] = useState([])

    const onChange = (event) => {
        let value = event.target.value

        fetch(`/api/search?name=${value}`)
            .then(response => response.json())
            .then(data => {
                setResults(data.results)
            })

    }


    return (
        <div className={'searchPage'}>

            <SearchBar onChange={onChange} />

            <div className={'resultsContainer'}>

                {results.map((result) => {
                    return (
                        <SearchResult result={result} />
                    )
                })}

            </div>

        </div>
    )

}

export default Search