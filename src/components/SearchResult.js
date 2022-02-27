import React from 'react'

import '../styles/components/SearchResult.css'

const SearchResult = ({ result }) => {


    return (

        <div className={'resultCol'}>

            <div className={'searchResult'}>

                <div style={{ fontSize: 24 }}>{result.name}</div>

                <img
                    src={'https://cdn.thewirecutter.com/wp-content/media/2020/10/beginnerdslr2020-2048px-9793.jpg?auto=webp&quality=60&crop=1.91:1&width=1200'}
                    alt={'Display'}
                    style={{height: '200px'}}
                />

                <div style={{ padding: 8 }}>Barcode: {result.barcode}</div>

            </div>

        </div>

    )

}

export default SearchResult