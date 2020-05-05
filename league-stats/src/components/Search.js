import React from 'react';
import Region from './Region';
import './sass/App.sass'
import './sass/Search.sass'

const Search = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit} className="search">
                <span className="search-icon"><i className="fas fa-search"></i></span>
                <input
                    className='search-bar'
                    name="search"
                    placeholder="Summoner Search"
                    type="text"
                    value={props.value}
                    onChange={props.handleChanges}
                />
                <Region
                    current={props.current}
                    regions={props.regions}
                    regionChange={props.regionChange}
                />
                
            </form>
        </div>
    )
}

export default Search;