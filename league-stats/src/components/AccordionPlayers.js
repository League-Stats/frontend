import React from 'react';
import {
    displayPlayers
} from './helper/index'

const AccordionPlayers = (props) => {
    const { details } = props
    const firstTeam = details.participantsInfo.slice(0, 5)
    const secondTeam = details.participantsInfo.slice(5, 10)
    const showFirstTeam = displayPlayers(firstTeam, props)
    const showSecondTeam = displayPlayers(secondTeam, props)
    return(
        <div>
            {showFirstTeam}
            -------------------------------------------------------------------------------------------------------------------
            {showSecondTeam}
        </div>
    )
}

export default AccordionPlayers;