import React from 'react';
// import axios from 'axios';
import '../sass/AccordionTabs.sass'

// async function getChampIcon(champId, patch){
//     const result = await axios(
//         `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`
//       )
//     const champs = Object.values(result.data.data)
//     let champName = champs.find(champ => Number(champ.key) === champId).id
//     return champName
// }

// export async function displayPlayers(team, props){
//     let results = await Promise.all(team.map(async player => {
//         const { stats } = player
//         let champs;

//         try{
//             const champIcon = await getChampIcon(player.championId, props.patch)
//             champs = champIcon
//         } catch(err){
//             console.log(err)
//         }
//         console.log(player.player.summonerName, stats.kills, stats.deaths, stats.assists)
//         return(
//             <div className="players">
//                 <div>{}</div>
//                 <p>{player.player.summonerName}</p>
//                 <p>{stats.kills}/{stats.deaths}/{stats.assists}</p>
//             </div>
//         )
//     })).then(data => {return data})
//     // console.log(results)
// }

export function displayPlayers(team, props){
    const { champions } = props
    return(
        <div>
            {team.map(player => {
                const { stats } = player
                let champName = champions.find(champ => Number(champ.key) === player.championId).id
                return(
                    <div className="players">
                        <img className="mini-champ-icon" alt="champion-icon" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champName}.png`}/>
                        <p>{player.player.summonerName}</p>
                        <p>{stats.kills}/{stats.deaths}/{stats.assists}</p>
                    </div>
                )
            })}
        </div>
    )
}