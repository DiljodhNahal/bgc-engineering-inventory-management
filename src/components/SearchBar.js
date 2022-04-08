import React from 'react'

import '../styles/components/SearchBar.css'

const SearchBar = ({ onChange }) => {

    return (

        <input
            id={'searchBar'}
            type={'text'}
            name={'search'}
            className={'searchBar'}
            placeholder={'Start Typing...'}
            onChange={onChange}

        />

    )

}

export default SearchBar   