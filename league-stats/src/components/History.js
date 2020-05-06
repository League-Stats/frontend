import React from 'react';
import Match from './Match';
import './sass/History.sass'

const History = (props) => {
    return(
        <div>
            {props.history.slice(0, props.showGames).map(game => {
                return <Match name={props.name} data={game} currentRegion={props.currentRegion}/>
            })}
        </div>
    )
}

export default History;