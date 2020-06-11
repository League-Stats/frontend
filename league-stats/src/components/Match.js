import React from 'react';
import Accordion from './Accordion';
import './sass/Match.sass'

const Match = (props) => {
  const getParticipantId = props.match.details.participantsInfo.find(player => player.player.summonerName === props.name).participantId
  const checkFirstTeamWin = props.match.details.teams[0].win
  let playerWinCheck;

  if((getParticipantId < 6 && checkFirstTeamWin === "Win") || (getParticipantId > 5 && checkFirstTeamWin === "Fail")){
    playerWinCheck = true
  } else {
    playerWinCheck = false
  }

  return(
    <div>
      <Accordion
        patch={props.patch}
        preview={props.match}
        content={`${playerWinCheck ? "Win" : "Loss"}`}
        playerWin={playerWinCheck}
        playerId={getParticipantId}
      />
    </div>
  )
}

export default Match;