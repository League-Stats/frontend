import React from 'react';
import './sass/Search.sass';

const Region = (props) => {
    return(
        <div>
            <select className="region-select" onChange={props.regionChange}>
                {props.regions.map(region => (
                    <option key={region.id} value={region.locale}>
                        {region.locale}
                    </option>
                ))}
            </select>
            <span className="dropdown"><i className="fas fa-sort"></i></span>
        </div>
    )
}

export default Region;