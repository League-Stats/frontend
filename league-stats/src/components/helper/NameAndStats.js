import React from 'react'

export function nameAndStats(team, props){
    return(
        <div>
            {team.map(player => {
                const { stats } = player
                const kdaRatio = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);

                const { item0, item1, item2, item3, item4, item5, item6 } = player.stats

                const img0 = item0 === 0 ? <div className="mini-no-item"></div> : <img className="mini-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item0}.png`}/>
                const img1 = item1 === 0 ? <div className="mini-no-item"></div> : <img className="mini-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item1}.png`}/>
                const img2 = item2 === 0 ? <div className="mini-no-item"></div> : <img className="mini-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item2}.png`}/>
                const img3 = item3 === 0 ? <div className="mini-no-item"></div> : <img className="mini-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item3}.png`}/>
                const img4 = item4 === 0 ? <div className="mini-no-item"></div> : <img className="mini-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item4}.png`}/>
                const img5 = item5 === 0 ? <div className="mini-no-item"></div> : <img className="mini-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item5}.png`}/>
                const img6 = item6 === 0 ? <div className="mini-no-item"></div> : <img className="mini-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item6}.png`}/>

                const cs = stats.neutralMinionsKilled + stats.totalMinionsKilled;
                const cspm = +(cs / props.details.gameDuration * 60).toFixed(2);

                return(
                    <div className="player-name-stats" key={`${player.player.summonerName}${player.stats.damageDealtToTurrets}`}>
                        <p className="player-tab-names">{player.player.summonerName}</p>
                        <p>{stats.kills}/<span className="player-tab-deaths">{stats.deaths}</span>/{stats.assists}</p>
                        <p className="player-tab-kda">({kdaRatio})</p>
                        <p><span className="player-tab-damage">{player.stats.totalDamageDealtToChampions}</span> DMG</p>
                        <p className="player-tab-cs">{cs} cs ({cspm})</p>
                        <div className="player-tab-items">
                            {img0}
                            {img1}
                            {img2}
                            {img3}
                            {img4}
                            {img5}
                            {img6}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}