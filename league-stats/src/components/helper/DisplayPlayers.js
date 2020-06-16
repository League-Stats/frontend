import React from 'react';
import '../sass/AccordionTabs.sass'

export function displayPlayers(team, props){
    const { champions } = props
    return(
        <div>
            {team.map(player => {
                const { stats } = player
                let champName = champions.find(champ => Number(champ.key) === player.championId).id
                return(
                    <div className="players" key={`${player.player.summonerName}${player.stats.damageDealtToTurrets}`}>
                        <img className="mini-champ-icon" alt="champion-icon" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champName}.png`}/>
                        <p>{player.player.summonerName}</p>
                        <p>{stats.kills}/{stats.deaths}/{stats.assists}</p>
                    </div>
                )
            })}
        </div>
    )
}