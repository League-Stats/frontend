import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import "../components/sass/Accordion.sass";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("chevron");
  const [gameModeData, setGameModeData] = useState([]);
  const [playersNames, setPlayersNames] = useState([]);
  const m = props.preview

  const getGameModeData = async () => {
    const result = await axios(
      "https://static.developer.riotgames.com/docs/lol/queues.json",
    );
    setGameModeData(result.data.find(mode => mode.queueId === m.queueId).description.slice(0, -6))
  }
  
  const getPlayersNames = async () => {
    const result = await axios(
      `http://ddragon.leagueoflegends.com/cdn/${props.patch}/data/en_US/champion.json`
    )
    const champs = Object.values(result.data.data)
    const playerChamps = m.participantsInfo.map(player => {
      let champName = champs.find(champ => Number(champ.key) === player.championId).id
      return <div className="player-pick" key={player.player.summonerName}>
        <img className="champIcon" alt="champion-icon" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champName}.png`}/>
        {player.player.summonerName}
      </div>
    })
    setPlayersNames(playerChamps)
  }

  useEffect((props, m) => {
    getGameModeData();
    getPlayersNames();
  }, [])

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(setActive === "active" ? "chevron" : "chevron rotate");
  }

  function gameTimeConversion(time){
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time % 3600 / 60);
    const seconds = Math.floor(time % 3600 % 60);

    const showHours = hours > 0 ? hours + "h " : "";
    const showMinutes = minutes > 0 ? minutes + "m " : "";
    const showSeconds = seconds > 0 ? seconds + "s" : "";

    return showHours + showMinutes + showSeconds
  }

  function convertGameMode(mode){
    if(mode === "5v5 Ranked Solo"){
      return "Ranked Solo" 
    } else if(mode === "5v5 ARAM"){
      return "ARAM"
    } else {
      return mode
    }
  }

  const gameTime = gameTimeConversion(m.gameDuration)
  const firstTeam = playersNames.slice(0, 5)
  const secondTeam = playersNames.slice(5, 10)

  return (
    <div className="accordion-container">
      <button className={`${props.playerWin ? "accordion-win" : "accordion-loss"} ${setActive}`} onClick={toggleAccordion}>
        <div className="game-type">
          <div>{gameTime}</div>
          <div>{convertGameMode(gameModeData)}</div>
        </div>
        <div className="teams">{firstTeam}</div>
        <div className="teams">{secondTeam}</div>
        <i className={`fas fa-chevron-right ${setRotate}`} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className={`${props.playerWin ? "accordion-inner-win" : "accordion-inner-loss"}`}
      >
        <div
          className="inner-content"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;