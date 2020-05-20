import React from 'react';
import Accordion from './Accordion';
import './sass/Match.sass'

const Match = (props) => {
  const getParticipantId = props.matchDetails.participantsInfo.find(player => player.player.summonerName === props.name).participantId
  const checkFirstTeamWin = props.matchDetails.teams[0].win
  let playerWinCheck;

  if((getParticipantId < 6 && checkFirstTeamWin === "Win") || (getParticipantId > 5 && checkFirstTeamWin === "Fail")){
    playerWinCheck = true
  } else {
    playerWinCheck = false
  }

  return(
    <div>
      <Accordion
        preview={props.matchDetails}
        content={`${playerWinCheck ? "Win" : "Loss"}`}
        playerWin={playerWinCheck}
        patch={props.patch}
        playerId={getParticipantId}
      />
    </div>
  )
}

export default Match;