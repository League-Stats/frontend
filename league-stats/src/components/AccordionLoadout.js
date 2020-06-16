import React from 'react';
import { getRunes } from './helper/index.js'

const AccordionLoadout = (props) => {
    const { runes, player } = props
    const runesInfo = getRunes(runes, player)

    const perk0 = runesInfo.find(rune => Number(rune.id) === player.stats.perk0)
    const perk1 = runesInfo.find(rune => Number(rune.id) === player.stats.perk1)
    const perk2 = runesInfo.find(rune => Number(rune.id) === player.stats.perk2)
    const perk3 = runesInfo.find(rune => Number(rune.id) === player.stats.perk3)
    const perk4 = runesInfo.find(rune => Number(rune.id) === player.stats.perk4)
    const perk5 = runesInfo.find(rune => Number(rune.id) === player.stats.perk5)

    const stat0 = player.stats.statPerk0
    const stat1 = player.stats.statPerk1
    const stat2 = player.stats.statPerk2

    return(
        <div className="tab-loadout">
            <section className="loadout-primary">
                <img className="loadout-rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perk0.icon}`} />
                <h1 className="loadout-rune-name">{perk0.name}</h1>
                <img className="loadout-rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perk1.icon}`} />
                <h1 className="loadout-rune-name">{perk1.name}</h1>
                <img className="loadout-rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perk2.icon}`} />
                <h1 className="loadout-rune-name">{perk2.name}</h1>
                <img className="loadout-rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perk3.icon}`} />
                <h1 className="loadout-rune-name">{perk3.name}</h1>
            </section>
            <section className="loadout-secondary">
            <img className="loadout-rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perk4.icon}`} />
            <h1 className="loadout-rune-name">{perk4.name}</h1>
            <img className="loadout-rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perk5.icon}`} />
            <h1 className="loadout-rune-name">{perk5.name}</h1>
            </section>
            <section className="loadout-tertiary">
                <img className="loadout-stat" alt="runes" src={require(`../images/statPerk/${stat0}.png`)} />
                <img className="loadout-stat" alt="runes" src={require(`../images/statPerk/${stat1}.png`)} />
                <img className="loadout-stat" alt="runes" src={require(`../images/statPerk/${stat2}.png`)} />
            </section>
        </div>
    )
}

export default AccordionLoadout;