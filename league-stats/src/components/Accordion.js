import React, { useState, useRef } from "react";

import "../components/sass/Accordion.sass";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("chevron");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(setActive === "active" ? "chevron" : "chevron rotate");
  }

  return (
    <div className="accordion-container">
      <button className={`${props.playerWin ? "accordion-win" : "accordion-loss"} ${setActive}`} onClick={toggleAccordion}>
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
