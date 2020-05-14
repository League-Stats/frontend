import React, { useState, useRef } from 'react';
import axios from 'axios';

import "../components/sass/Accordion.sass";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("chevron");
  const m = props.preview

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

  // async function getGameMode(queueId){
  //   try{
  //     const res = await axios.request({
  //       method: 'GET',
  //       url: "https://static.developer.riotgames.com/docs/lol/queues.json"
  //     })
  //     const data = res.data.find(mode => mode.queueId === queueId).description.slice(0, -6);
  //     return data
  //   } catch(error) {
  //     console.log(error);
  //   }
  // }

  async function getGameMode(queueId){
    await axios.request({
      method: 'GET',
      url: "https://static.developer.riotgames.com/docs/lol/queues.json"
    })
    .then(res => {
      return res.data
    })
    .then((res) =>{
      const test = res.find(mode => mode.queueId === queueId).description.slice(0, -6)
      return test.toString()
    })
    .catch(error => {
      console.log(error)
    })
  }

  const gameTime = gameTimeConversion(m.gameDuration)
  const gameMode = getGameMode(m.queueId);

  return (
    <div className="accordion-container">
      <button className={`${props.playerWin ? "accordion-win" : "accordion-loss"} ${setActive}`} onClick={toggleAccordion}>
        {gameTime}
        {gameMode}
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
