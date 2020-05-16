import React from 'react';
import './sass/Banner.sass';

const getLevelBorder = (lvl) => {
    let border = 30;
    if(lvl >= 30 && lvl < 50) border = 30;
    if(lvl >= 50 && lvl < 75) border = 50;
    if(lvl >= 75 && lvl < 100) border = 75;
    if(lvl >= 100 && lvl < 125) border = 100;
    if(lvl >= 125 && lvl < 150) border = 125;
    if(lvl >= 150 && lvl < 175) border = 150;
    if(lvl >= 175 && lvl < 200) border = 175;
    if(lvl >= 200 && lvl < 225) border = 200;
    if(lvl >= 225 && lvl < 250) border = 225;
    if(lvl >= 250 && lvl < 275) border = 250;
    if(lvl >= 275 && lvl < 300) border = 275;
    if(lvl >= 300 && lvl < 325) border = 300;
    if(lvl >= 325 && lvl < 350) border = 325;
    if(lvl >= 350 && lvl < 375) border = 350;
    if(lvl >= 375 && lvl < 400) border = 375;
    if(lvl >= 400 && lvl < 425) border = 400;
    if(lvl >= 425 && lvl < 450) border = 425;
    if(lvl >= 450 && lvl < 475) border = 450;
    if(lvl >= 475 && lvl < 500) border = 475;
    if(lvl >= 500) border = 500;
    return border
}

const Banner = (props) => {
    let { info } = props
    return(
        <div className="banner">
            <h1 className="smnr-name">{info.name}</h1>
            <img alt="player-icon" className="icon" src={`https://ddragon.leagueoflegends.com/cdn/${props.patch}/img/profileicon/${info.icon}.png`}/>
            <img alt="player-level-border" className="border" src={require(`../images/lvl/lvl${getLevelBorder(info.level)}.png`)}/>
            <p className="number">{info.level}</p>
        </div>
    )
}

export default Banner;