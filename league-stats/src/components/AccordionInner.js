import React, { useState } from "react";
import AccordionTab from "./AccordionTab";
import AccordionPlayers from './AccordionPlayers';
// import AccordionAnalysis from './AccordionAnalysis';
import AccordionLoadout from './AccordionLoadout';
// import AccordionExtra from './AccordionExtra';

const AccordionInner = props => {
  const [currentTab, setCurrentTab] = useState(1);
  const checkIfCurrent = tabID => (currentTab === tabID ? true : false);

  return (
    <section className="tab-wrapper">
        <div className="button-wrapper">
            <button
                className={checkIfCurrent(1) ? "tab-button buttonActive" : "tab-button"}
                onClick={() => setCurrentTab(1)}
            >
                Players
            </button>
            {/* <button
                className={checkIfCurrent(2) ? "tab-button buttonActive" : "tab-button"}
                onClick={() => setCurrentTab(2)}
            >
                Analysis
            </button> */}
            <button
                className={checkIfCurrent(3) ? "tab-button buttonActive" : "tab-button"}
                onClick={() => setCurrentTab(3)}
            >
                Loadout
            </button>
            {/* <button
                className={checkIfCurrent(4) ? "tab-button buttonActive" : "tab-button"}
                onClick={() => setCurrentTab(4)}
            >
                Extra
            </button> */}
        </div>

      <>
        <AccordionTab tabID={1} isActive={checkIfCurrent(1)}>
          <AccordionPlayers
            details={props.details}
            patch={props.patch}
            champions={props.champions}
            spells={props.spells}
            runes={props.runes}
            player={props.player}
            region={props.region}
          />
        </AccordionTab>
        {/* <AccordionTab tabID={2} isActive={checkIfCurrent(2)}>
          <AccordionAnalysis details={props.details} />
        </AccordionTab> */}
        <AccordionTab tabID={3} isActive={checkIfCurrent(3)}>
          <AccordionLoadout
          runes={props.runes}
            details={props.details}
            player={props.player}
          />
        </AccordionTab>
        {/* <AccordionTab tabID={3} isActive={checkIfCurrent(4)}>
          <AccordionExtra details={props.details} />
        </AccordionTab> */}
      </>
    </section>
  );
};

export default AccordionInner;
