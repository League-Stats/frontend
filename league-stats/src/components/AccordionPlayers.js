import React from 'react';
import './sass/AccordionTabs.sass'
import {
    teamsPicks,
    nameAndStats,
    items
} from './helper/index'

const AccordionPlayers = (props) => {
    const { details } = props
    const firstTeam = details.participantsInfo.slice(0, 5)
    const secondTeam = details.participantsInfo.slice(5, 10)
    const showFirstTeam = teamsPicks(firstTeam, props)
    const showSecondTeam = teamsPicks(secondTeam, props)
    const FirstTeamNameAndStats = nameAndStats(firstTeam, props)
    const SecondTeamNameAndStats = nameAndStats(secondTeam, props)
    const FirstTeamItems = items(firstTeam, props)
    const SecondTeamItems = items(secondTeam, props)

    return(
        <div>
            <section className="players-section">
                {showFirstTeam}
                {FirstTeamNameAndStats}
                {FirstTeamItems}
            </section>
            -------------------------------------------------------------------------------------------------------------------
            <section className="players-section">
                {showSecondTeam}
                {SecondTeamNameAndStats}
                {SecondTeamItems}
            </section>
        </div>
    )
}

export default AccordionPlayers;