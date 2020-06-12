import React from 'react';

export function gameResult(props, time){
    if(time < 500){
        return <div className={"result-remake"}>REMAKE</div>
    } else if(props.playerWin === true){
        return <div className={"result-victory"}>VICTORY</div>
    } else {
        return <div className={"result-defeat"}>DEFEAT</div>
    }
}