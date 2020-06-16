import React from 'react';
import {
    teamsPicks
} from './helper/index'

const AccordionPlayers = (props) => {
    const { details } = props
    const firstTeam = details.participantsInfo.slice(0, 5)
    const secondTeam = details.participantsInfo.slice(5, 10)
    const showFirstTeam = teamsPicks(firstTeam, props)
    const showSecondTeam = teamsPicks(secondTeam, props)
    return(
        <div>
            {showFirstTeam}
            -------------------------------------------------------------------------------------------------------------------
            {showSecondTeam}
        </div>
    )
}

export default AccordionPlayers;