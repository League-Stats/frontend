import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  baron1,
  baron2,
  dragon1,
  dragon2,
  herald1,
  herald2,
  inhib1,
  inhib2,
  tower1,
  tower2,
} from '../images/objectives'

import "../components/sass/Accordion.sass";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("chevron");
  const [gameModeData, setGameModeData] = useState([]);
  const [playersNames, setPlayersNames] = useState([]);
  const [playerSetup, setPlayerSetup] = useState([]);
  const m = props.preview

  // console.log(m)

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
        <img className="champ-icon" alt="champion-icon" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champName}.png`}/>
        <div className="player-names">{player.player.summonerName}</div>
      </div>
    })
    setPlayersNames(playerChamps)
  }

  const getPlayersSetup = async () => {
    const champion = await axios(
      `http://ddragon.leagueoflegends.com/cdn/${props.patch}/data/en_US/champion.json`
    )
    const champs = Object.values(champion.data.data)
    const player = m.participantsInfo.find(player => player.participantId === props.playerId)
    const playerChamp = champs.find(champ => Number(champ.key) === player.championId)

    
    const getSummonerSpells = await axios(
      `http://ddragon.leagueoflegends.com/cdn/${props.patch}/data/en_US/summoner.json`
    )
    const summonerSpells = Object.values(getSummonerSpells.data.data)
    const spell1 = summonerSpells.find(spell => Number(spell.key) === player.spell1Id)
    const spell2 = summonerSpells.find(spell => Number(spell.key) === player.spell2Id)
    
    const images =  <div className="curr-setup-container">
                      <p className="curr-player-champ-name"> {playerChamp.name}</p>
                      <div className="champ-spells-container">
                        <img className="curr-champ-icon" alt="Current Player's Champ Icon" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${playerChamp.id}.png`}/>
                        <div className="curr-spells">
                          <img className="curr-spell" alt="Current Player's Summoner Spell 1" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/spell/${spell1.id}.png`}/>
                          <img className="curr-spell" alt="Current Player's Summoner Spell 2" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/spell/${spell2.id}.png`}/>
                        </div>
                      </div>
                    </div>

    setPlayerSetup(images)
  }

  // console.log(currPlayerChamp)

  useEffect((props, m) => {
    getGameModeData();
    getPlayersNames();
    getPlayersSetup();
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
  const currPlayerStats = m.participantsInfo.find(player => player.participantId === props.playerId)

  return (
    <div className="accordion-container">
      <button className={`${props.playerWin ? "accordion-win" : "accordion-loss"} ${setActive}`} onClick={toggleAccordion}>
        <div className="player-stats">
          {playerSetup}
        </div>
        <div className="game-type">
          <div>{gameTime}</div>
          <div>{convertGameMode(gameModeData)}</div>
        </div>
          <div className="objectives-container">
            <div className="objective">  
              <img src={baron1} className="objectives-icon" alt="baron"/>
              <p>{m.teams[0].baronKills}</p>
            </div>
            <div className="objective">  
              <img src={dragon1} className="objectives-icon" alt="dragon"/>
              <p>{m.teams[0].dragonKills}</p>
            </div>
            <div className="objective">  
              <img src={inhib1} className="objectives-icon" alt="inhib"/>
              <p>{m.teams[0].inhibitorKills}</p>
            </div>
            <div className="objective">  
              <img src={herald1} className="objectives-icon" alt="herald"/>
              <p>{m.teams[0].riftHeraldKills}</p>
            </div>
            <div className="objective">  
              <img src={tower1} className="objectives-icon" alt="tower"/>
              <p>{m.teams[0].towerKills}</p>
            </div>
          </div>
        <div className="teams">{firstTeam}</div>
        <div className="teams">{secondTeam}</div>
          <div className="objectives-container">
            <div className="objective">  
              <img src={baron2} className="objectives-icon" alt="baron-icon"/>
              <p>{m.teams[1].baronKills}</p>
            </div>
            <div className="objective">  
              <img src={dragon2} className="objectives-icon" alt="dragon-icon"/>
              <p>{m.teams[1].dragonKills}</p>
            </div>
            <div className="objective">  
              <img src={inhib2} className="objectives-icon" alt="inhib-icon"/>
              <p>{m.teams[1].inhibitorKills}</p>
            </div>
            <div className="objective">  
              <img src={herald2} className="objectives-icon" alt="herald-icon"/>
              <p>{m.teams[1].riftHeraldKills}</p>
            </div>
            <div className="objective">  
              <img src={tower2} className="objectives-icon" alt="tower-icon"/>
              <p>{m.teams[1].towerKills}</p>
            </div>
          </div>
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