import React from 'react';
import '../sass/AccordionTabs.sass'
import { getRunes } from './GetRunes'

export function teamsPicks(team, props){
    const { champions, spells, runes, player } = props
    const runesInfo = getRunes(runes, player)
    return(
        <div>
            {team.map(player => {
                let champName = champions.find(champ => Number(champ.key) === player.championId).id
                const spell1 = spells.find(spell => Number(spell.key) === player.spell1Id).id
                const spell2 = spells.find(spell => Number(spell.key) === player.spell2Id).id

                const perk0 = runesInfo.find(rune => Number(rune.id) === player.stats.perk0)
                const secondaryTree = runes.find(rune => Number(rune.id) === player.stats.perkSubStyle)

                return(
                    <div className="player-loadouts" key={`${player.player.summonerName}${player.stats.damageDealtToTurrets}`}>
                        <img className="mini-champ-icon" alt="champion-icon" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champName}.png`}/>
                        <div className="mini-spells">
                          <img className="mini-spell" alt="Team Player's Summoner Spell 1" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/spell/${spell1}.png`}/>
                          <img className="mini-spell" alt="Team Player's Summoner Spell 2" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/spell/${spell2}.png`}/>
                        </div>
                        <div className="mini-rune-perks">
                            <div className="mini-rune-perk-container">
                                <img className="mini-rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perk0.icon}`} />
                            </div>
                            <div className="mini-rune-perk-container">
                                <img className="mini-rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${secondaryTree.icon}`} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}