import React from "react";
import "./sass/AccordionTabs.sass";

const AccordionTab = props => {
  return (
    <div className={props.isActive ? "tab active-tab" : "tab"}>
      {props.children}
    </div>
  );
};

export default AccordionTab;
