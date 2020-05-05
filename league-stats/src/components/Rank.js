import React from 'react';
import './sass/Rank.sass'
const Rank = ({ rank }) => {
    
    return (
        <div className="rank-data">
                <img className="rank-emblem" alt="rank tier" src={require(`../images/ranks/${rank.tier} ${rank.rank}.png`)} />
                <h1 className="rank-queue">{rank.queueType}</h1>
                <h1 className="rank-tier">{rank.tier} {rank.rank} - {rank.leaguePoints} LP</h1>
                <h1 className="rank-wins">{rank.wins} W / {rank.losses} L</h1>
        </div>
    )
}

export default Rank;