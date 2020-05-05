import React from 'react';
import Rank from './Rank';

const RankContainer = (props) => {
    return(
        <div className="section-rank">
            {props.rank.map(rank => {return <Rank rank={rank} key={rank.queueType}/>})}
        </div>
    )
}

export default RankContainer;