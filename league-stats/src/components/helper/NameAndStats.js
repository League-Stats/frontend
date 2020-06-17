import React from 'react'

export function nameAndStats(team, props){
    return(
        <div>
            {team.map(player => {
                const { stats } = player
                const getKdaRatio = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);
                const kdaRatio = getKdaRatio === "Infinity" ? "Clean" : getKdaRatio
                const cs = stats.neutralMinionsKilled + stats.totalMinionsKilled;
                const cspm = +(cs / props.details.gameDuration * 60).toFixed(2);

                return(
                    <div className="player-name-stats" key={`${player.player.summonerName}${player.stats.damageDealtToTurrets}`}>
                        <p className="player-tab-names">{player.player.summonerName}</p>
                        <p className="player-tab-kda">{stats.kills}/<span className="player-tab-deaths">{stats.deaths}</span>/{stats.assists}</p>
                        <p className="player-tab-kdar">({kdaRatio})</p>
                        <p className="player-tab-damage"><span className="damage-span">{player.stats.totalDamageDealtToChampions}</span> DMG</p>
                        <p className="player-tab-cs">{cs} cs <span className="player-tab-cspm">({cspm})</span></p>
                    </div>
                )
            })}
        </div>
    )
}