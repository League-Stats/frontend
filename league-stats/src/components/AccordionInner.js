import React, { useState } from "react";
import AccordionTab from "./AccordionTab";
import AccordionPlayers from './AccordionPlayers';
import AccordionAnalysis from './AccordionAnalysis';
import AccordionLoadout from './AccordionLoadout';
import AccordionExtra from './AccordionExtra';

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
            <button
                className={checkIfCurrent(2) ? "tab-button buttonActive" : "tab-button"}
                onClick={() => setCurrentTab(2)}
            >
                Analysis
            </button>
            <button
                className={checkIfCurrent(3) ? "tab-button buttonActive" : "tab-button"}
                onClick={() => setCurrentTab(3)}
            >
                Loadout
            </button>
            <button
                className={checkIfCurrent(4) ? "tab-button buttonActive" : "tab-button"}
                onClick={() => setCurrentTab(4)}
            >
                Extra
            </button>
        </div>

      <>
        <AccordionTab tabID={1} isActive={checkIfCurrent(1)}>
          <AccordionPlayers />
        </AccordionTab>
        <AccordionTab tabID={2} isActive={checkIfCurrent(2)}>
          <AccordionAnalysis />
        </AccordionTab>
        <AccordionTab tabID={3} isActive={checkIfCurrent(3)}>
          <AccordionLoadout />
        </AccordionTab>
        <AccordionTab tabID={3} isActive={checkIfCurrent(4)}>
          <AccordionExtra />
        </AccordionTab>
      </>
    </section>
  );
};

export default AccordionInner;
