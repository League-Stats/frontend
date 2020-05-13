import React from 'react';
import './sass/Match.sass'

const Match = (props) => {
  const getParticipantId = props.matchDetails.participantIdentities.find(player => player.player.summonerName === props.name).participantId
  const checkFirstTeamWin = props.matchDetails.teams[0].win
  let playerWinCheck;

  if((getParticipantId < 6 && checkFirstTeamWin === "Win") || (getParticipantId > 5 && checkFirstTeamWin === "Fail")){
    playerWinCheck = true
  } else {
    playerWinCheck = false
  }
  console.log(props.matchDetails)

  return(
    <div className={`${playerWinCheck ? "winColor" : "loseColor"}`}>
      STATUS
    </div>
  )
}

export default Match;