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

  const [summonerSpells, setSummonerSpells] = useState([]);
  const [keystone, setKeystone] = useState([]);
  const [playerNameAndChamp, setPlayerNameAndChamp] = useState([]);

  const { details } = props.preview;
  console.log(details)
  const player = details.participantsInfo.find(player => player.participantId === props.playerId);
  const stats = player.stats;

  const content = useRef(null);

  const getSummonerSpells = async () => {
    const champion = await axios(
      `http://ddragon.leagueoflegends.com/cdn/${props.patch}/data/en_US/champion.json`
    )
    const champs = Object.values(champion.data.data)
    const playerChamp = champs.find(champ => Number(champ.key) === player.championId)

    
    const getSpells = await axios(
      `http://ddragon.leagueoflegends.com/cdn/${props.patch}/data/en_US/summoner.json`
    )
    const summonerSpells = Object.values(getSpells.data.data)
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

    setSummonerSpells(images)
  }

  const getKeystone = async () => {
    const runes = await axios(
      `http://ddragon.leagueoflegends.com/cdn/${props.patch}/data/en_US/runesReforged.json`
    )

    const slots = runes.data.map(runePath => {return runePath.slots})
    const flattenSlots = [].concat.apply([], slots)
    const subSlots = flattenSlots.map(subSlot => {return subSlot.runes})
    const runesInfo = [].concat.apply([], subSlots)

    const perk0 = runesInfo.find(rune => Number(rune.id) === player.stats.perk0)
    const perk1 = runesInfo.find(rune => Number(rune.id) === player.stats.perk1)
    const perk2 = runesInfo.find(rune => Number(rune.id) === player.stats.perk2)
    const perk3 = runesInfo.find(rune => Number(rune.id) === player.stats.perk3)
    const perk4 = runesInfo.find(rune => Number(rune.id) === player.stats.perk4)
    const perk5 = runesInfo.find(rune => Number(rune.id) === player.stats.perk5)

    const perks = [perk1, perk2, perk3, perk4, perk5]

    const getRuneImage = perks.map(perk => {
      return <div className="rune-perk-container">
        <img className="rune-perk" key={perk.id} alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perk.icon}`} />
      </div>
    })

    const getKeystoneImage = <div className="rune-perk-container">
                              <img className="rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perk0.icon}`} />
                            </div>

    const getSecondaryTreePath = runes.data.find(rune => Number(rune.id) === player.stats.perkSubStyle)
    const getSecondaryTreePathImage = <div className="rune-perk-container">
                                        <img className="rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${getSecondaryTreePath.icon}`} />
                                      </div>

    setKeystone([getRuneImage, getKeystoneImage, getSecondaryTreePathImage])
  }
  
  useEffect((props, m) => {
    getSummonerSpells();
    getKeystone();
    getPlayerNameAndChamp();
  }, [])

  function toTimeAgo(timestamp){
    const timeAgo = Number(new Date()) - timestamp;
    const minute = 60000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
      case timeAgo < minute:
        const seconds = Math.round(timeAgo / 1000);
        return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`
      case timeAgo < hour:
        const minutes = Math.round(timeAgo / minute);
        return  `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`
      case timeAgo < day:
        const hours = Math.round(timeAgo / hour);
        return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`
      case timeAgo < month:
        const days = Math.round(timeAgo / day);
        return `${days} ${days > 1 ? 'days' : 'day'} ago`
      case timeAgo < year:
        const months = Math.round(timeAgo / month);
        return `${months} ${months > 1 ? 'months' : 'month'} ago`
      case timeAgo > year:
        const years = Math.round(timeAgo / year);
        return `${years} ${years > 1 ? 'years' : 'year'} ago`
      default:
        return "";
    }
  };

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(setActive === "active" ? "chevron" : "chevron rotate");
  }

  const gameResult = (time) => {
    if(time < 500){
      return <div className={"result-remake"}>REMAKE</div>
    } else if(props.playerWin === true){
      return <div className={"result-victory"}>VICTORY</div>
    } else {
      return <div className={"result-defeat"}>DEFEAT</div>
    }
  }

  const accordionResult = (time) => {
    if(time < 500){
      return "accordion-remake"
    } else if (props.playerWin){
      return "accordion-win"
    } else {
      return "accordion-loss"
    }
  }

  const currPlayerStats = () => {
    const kills = stats.kills;
    const deaths = stats.deaths;
    const assists = stats.assists;
    const kdaRatio = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);
    const level = stats.champLevel;
    const cs = stats.neutralMinionsKilled + stats.totalMinionsKilled;
    // The + sign in front of the paranthesis is necessary or else values such as 1.5 will be rounded to 1.50 instead of 1.5
    const cspm = +(cs / details.gameDuration * 60).toFixed(2);
    const participantId = player.player.participantId;
    const teamId = participantId < 6 ? 0 : 1;
    let teamKills = 0;

    if(teamId === 0 ){
      details.participantsInfo.slice(0, 5).map(participant => {
        return teamKills += participant.stats.kills
      });
    } else {
      details.participantsInfo.slice(5, 10).map(participant => {
        return teamKills += participant.stats.kills
      });
    };

    let killsAssists = stats.kills + stats.assists;
    let kp = Math.round(killsAssists * 100 / teamKills)
    
    return <div className="curr-player-stats">
      <section className="curr-player-kda">
        <p className="kda">
          {kills} / <span className="deaths">{deaths}</span> / {assists}
        </p>
        <p>{kdaRatio} <span className="white-glow">KDA</span></p>
      </section>
      <section>
        <p>Level {level}</p>
        <p>{cs} <span className="white-glow">({cspm})</span> CS</p>
        <p>{kp}% KP</p>
      </section>
    </div>
  }

  const currPlayerItems = () => {
    const { item0, item1, item2, item3, item4, item5, item6 } = player.stats

    const img0 = item0 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item0}.png`}/>
    const img1 = item1 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item1}.png`}/>
    const img2 = item2 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item2}.png`}/>
    const img3 = item3 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item3}.png`}/>
    const img4 = item4 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item4}.png`}/>
    const img5 = item5 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item5}.png`}/>
    const img6 = item6 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item6}.png`}/>
    
    return <div className="curr-player-items">
      <section>
        <div className="curr-player-items-row-1">
          {img0}
          {img1}
          {img2}
        </div>
        <div className="curr-player-items-row-2">
          {img3}
          {img4}
          {img5}
        </div>
      </section>
      {img6}
    </div>
  }

  const currPlayerVision = () => {
    const controlWards = stats.visionWardsBoughtInGame
    const score = stats.visionScore
    return <div className="curr-player-vision">
      <p>Control Wards: {controlWards}</p>
      <p>Vision Score: {score}</p>
    </div>
  }

  const getPlayerNameAndChamp = async () => {
    const result = await axios(
      `http://ddragon.leagueoflegends.com/cdn/${props.patch}/data/en_US/champion.json`
    )
    const champs = Object.values(result.data.data)
    const playerChamps = details.participantsInfo.map(player => {
      let champName = champs.find(champ => Number(champ.key) === player.championId).id
      return <div className="player-pick" key={player.player.summonerName}>
        <img className="champ-icon" alt="champion-icon" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champName}.png`}/>
        <div className="player-names">{player.player.summonerName}</div>
      </div>
    })
    setPlayerNameAndChamp(playerChamps)
  }

  const getTimeAgo = toTimeAgo(details.gameCreation)
  
  let firstTeam = playerNameAndChamp.slice(0, 5)
  let secondTeam = playerNameAndChamp.slice(5, 10)

  return (
    <div className="accordion-container">
      <button className={`${accordionResult(details.gameDuration)} ${setActive}`} onClick={toggleAccordion}>
        <div className="game-type">
          <div className="game-mode">{details.queueIdConverted}</div>
          <div className="time-ago">{getTimeAgo}</div>
          {gameResult(details.gameDuration)}
          <div className="game-time">{details.gameDurationConverted}</div>
        </div>
        <div className="player-loadout">
          {summonerSpells}
          <div className="keystones">
            {keystone[1]}
            {keystone[2]}
          </div>
        </div>
        <div>
          {currPlayerStats()}
        </div>
        <div className="items-and-vision">
          {currPlayerItems()}
          {currPlayerVision()}
        </div>
          <div className="objectives-container">
            <div className="objective">  
              <img src={baron1} className="objectives-icon" alt="baron"/>
              <p>{details.teams[0].baronKills}</p>
            </div>
            <div className="objective">  
              <img src={dragon1} className="objectives-icon" alt="dragon"/>
              <p>{details.teams[0].dragonKills}</p>
            </div>
            <div className="objective">  
              <img src={inhib1} className="objectives-icon" alt="inhib"/>
              <p>{details.teams[0].inhibitorKills}</p>
            </div>
            <div className="objective">  
              <img src={herald1} className="objectives-icon" alt="herald"/>
              <p>{details.teams[0].riftHeraldKills}</p>
            </div>
            <div className="objective">  
              <img src={tower1} className="objectives-icon" alt="tower"/>
              <p>{details.teams[0].towerKills}</p>
            </div>
          </div>
        <div className="teams">{firstTeam}</div>
        <div className="teams">{secondTeam}</div>
          <div className="objectives-container">
            <div className="objective">  
              <img src={baron2} className="objectives-icon" alt="baron-icon"/>
              <p>{details.teams[1].baronKills}</p>
            </div>
            <div className="objective">  
              <img src={dragon2} className="objectives-icon" alt="dragon-icon"/>
              <p>{details.teams[1].dragonKills}</p>
            </div>
            <div className="objective">  
              <img src={inhib2} className="objectives-icon" alt="inhib-icon"/>
              <p>{details.teams[1].inhibitorKills}</p>
            </div>
            <div className="objective">  
              <img src={herald2} className="objectives-icon" alt="herald-icon"/>
              <p>{details.teams[1].riftHeraldKills}</p>
            </div>
            <div className="objective">  
              <img src={tower2} className="objectives-icon" alt="tower-icon"/>
              <p>{details.teams[1].towerKills}</p>
            </div>
          </div>
        <i className={`fas fa-chevron-right ${setRotate}`} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className={`${accordionResult(details.gameDuration)}-inner`}
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