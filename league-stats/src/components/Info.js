import React from 'react';
import './sass/Info.sass'
import Banner from './Banner.js'

const Info = (props) => {
    return (
        <div className="info">
            <Banner info={props.info} patch={props.patch} />
        </div>
    )
}

export default Info;