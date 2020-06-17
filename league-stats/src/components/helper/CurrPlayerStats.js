import React from 'react';

export function currPlayerStats(stats, details, player){
    const { kills, deaths, assists } = stats;
    const getKdaRatio = ((kills + assists) / deaths).toFixed(2);
    const kdaRatio = getKdaRatio === "Infinity" ? "Clean" : getKdaRatio
    const level = stats.champLevel;
    const cs = stats.neutralMinionsKilled + stats.totalMinionsKilled;
    // The + sign in front of the paranthesis is necessary or else values such as 1.5 will be rounded to 1.50 instead of 1.5
    const cspm = +(cs / details.gameDuration * 60).toFixed(2);
    const { participantId } = player.player;
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

    let killsAssists = kills + assists;
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