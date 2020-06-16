import React, { useState, useEffect, useRef } from 'react';
import "../components/sass/Accordion.sass";
import Objectives from './Objectives';
import AccordionInner from './AccordionInner';
import {
  toTimeAgo,
  gameResult,
  currPlayerStats,
  currPlayerItems,
  currPlayerVision,
  getRunes
} from './helper/index'

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("chevron");

  const [summonerSpells, setSummonerSpells] = useState([]);
  const [keystone, setKeystone] = useState([]);
  const [playerNameAndChamp, setPlayerNameAndChamp] = useState([]);

  const { details } = props.preview;
  const player = details.participantsInfo.find(player => player.participantId === props.playerId);
  const stats = player.stats;
  const { champions, spells, runes } = props;

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(setActive === "active" ? "chevron" : "chevron rotate");
  }

  function accordionResult(time){
    if(time < 500){
      return "accordion-remake"
    } else if (props.playerWin){
      return "accordion-win"
    } else {
      return "accordion-loss"
    }
  }

  const getSummonerSpells = async () => {
    const playerChamp = champions.find(champ => Number(champ.key) === player.championId)
    const spell1 = spells.find(spell => Number(spell.key) === player.spell1Id)
    const spell2 = spells.find(spell => Number(spell.key) === player.spell2Id)
    
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
    const runesInfo = getRunes(runes)

    const perk0 = runesInfo.find(rune => Number(rune.id) === player.stats.perk0)
    const perk1 = runesInfo.find(rune => Number(rune.id) === player.stats.perk1)
    const perk2 = runesInfo.find(rune => Number(rune.id) === player.stats.perk2)
    const perk3 = runesInfo.find(rune => Number(rune.id) === player.stats.perk3)
    const perk4 = runesInfo.find(rune => Number(rune.id) === player.stats.perk4)
    const perk5 = runesInfo.find(rune => Number(rune.id) === player.stats.perk5)

    const secondaryTree = runes.find(rune => Number(rune.id) === player.stats.perkSubStyle)

    const perks = [secondaryTree, perk0, perk1, perk2, perk3, perk4, perk5]

    const getRuneImage = perks.slice(2, 7).map(perk => {
      return <div className="rune-perk-container">
        <img className="rune-perk" key={perk.id} alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perk.icon}`} />
      </div>
    })

    const getKeystoneImage = <div className="rune-perk-container">
                              <img className="rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perks[1].icon}`} />
                            </div>

    const getSecondaryTreePathImage = <div className="rune-perk-container">
                                        <img className="rune-perk" alt="runes" src={`https://ddragon.leagueoflegends.com/cdn/img/${perks[0].icon}`} />
                                      </div>

    setKeystone([getRuneImage, getKeystoneImage, getSecondaryTreePathImage])
  }

  const getPlayerNameAndChamp = async () => {
    const playerChamps = details.participantsInfo.map(player => {
      let champName = champions.find(champ => Number(champ.key) === player.championId).id
      return <div className="player-pick" key={player.player.summonerName}>
        <img className="champ-icon" alt="champion-icon" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/champion/${champName}.png`}/>
        <div className="player-names">{player.player.summonerName}</div>
      </div>
    })
    setPlayerNameAndChamp(playerChamps)
  }
  
  useEffect((props, m) => {
    getSummonerSpells();
    getKeystone();
    getPlayerNameAndChamp();
  }, [])

  const getTimeAgo = toTimeAgo(details.gameCreation);
  const getGameResult = gameResult(props, details.gameDuration);
  const getCurrPlayerStats = currPlayerStats(stats, details, player);
  const getCurrPlayerItems = currPlayerItems(player, props);
  const getCurrPlayerVision = currPlayerVision(stats);
  
  let firstTeam = playerNameAndChamp.slice(0, 5);
  let secondTeam = playerNameAndChamp.slice(5, 10);
  return (
    <div className="accordion-container">
      <button className={`${accordionResult(details.gameDuration)} ${setActive}`} onClick={toggleAccordion}>
        <div className="game-type">
          <div className="game-mode">{details.queueIdConverted}</div>
          <div className="time-ago">{getTimeAgo}</div>
          {getGameResult}
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
          {getCurrPlayerStats}
        </div>
        <div className="items-and-vision">
          {getCurrPlayerItems}
          {getCurrPlayerVision}
        </div>
          <Objectives details={details} team={"blue"}/>
        <div className="teams">{firstTeam}</div>
        <div className="teams">{secondTeam}</div>
          <Objectives details={details} team={"red"}/>
        <i className={`fas fa-chevron-right ${setRotate}`} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className={`${accordionResult(details.gameDuration)}-inner`}
      >
        <div className="inner-content">
          <AccordionInner
            details={details}
            patch={props.patch}
            champions={props.champions}
            spells={props.spells}
            runes={props.runes}
            player={player}
            region={props.region}
          />
        </div>
      </div>
    </div>
  );
}

export default Accordion;