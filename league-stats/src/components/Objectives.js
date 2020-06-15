import React from 'react';
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
    tower2
} from '../images/objectives'

const Objectives = (props) => {
    const { team, details } = props
    return(
        <div className="objectives-container">
            <div className="objective">
              <img src={team === "blue" ? baron1 : baron2} className="objectives-icon" alt="baron"/>
              <p>{details.teams[team === "blue" ? 0 : 1].baronKills}</p>
            </div>
            <div className="objective">  
              <img src={team === "blue" ? dragon1 : dragon2} className="objectives-icon" alt="dragon"/>
              <p>{details.teams[team === "blue" ? 0 : 1].dragonKills}</p>
            </div>
            <div className="objective">  
              <img src={team === "blue" ? inhib1 : inhib2} className="objectives-icon" alt="inhib"/>
              <p>{details.teams[team === "blue" ? 0 : 1].inhibitorKills}</p>
            </div>
            <div className="objective">  
              <img src={team === "blue" ? herald1 : herald2} className="objectives-icon" alt="herald"/>
              <p>{details.teams[team === "blue" ? 0 : 1].riftHeraldKills}</p>
            </div>
            <div className="objective">  
              <img src={team === "blue" ? tower1 : tower2} className="objectives-icon" alt="tower"/>
              <p>{details.teams[team === "blue" ? 0 : 1].towerKills}</p>
            </div>
        </div>
    )
}

export default Objectives;