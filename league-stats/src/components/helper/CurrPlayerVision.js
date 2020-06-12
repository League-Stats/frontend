import React from 'react';

export function currPlayerVision(stats){
    const controlWards = stats.visionWardsBoughtInGame
    const score = stats.visionScore
    return <div className="curr-player-vision">
      <p>Control Wards: {controlWards}</p>
      <p>Vision Score: {score}</p>
    </div>
}