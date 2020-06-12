import React from 'react';

export function currPlayerItems(player, props){
    const { item0, item1, item2, item3, item4, item5, item6 } = player.stats

    const img0 = item0 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item0}.png`}/>
    const img1 = item1 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item1}.png`}/>
    const img2 = item2 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item2}.png`}/>
    const img3 = item3 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item3}.png`}/>
    const img4 = item4 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item4}.png`}/>
    const img5 = item5 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item5}.png`}/>
    const img6 = item6 === 0 ? <div className="no-item"></div> : <img className="curr-player-item" alt="player item" src={`http://ddragon.leagueoflegends.com/cdn/${props.patch}/img/item/${item6}.png`}/>
    
    return <div className="curr-player-items">
      <section>
        <div className="curr-player-items-row-1">
          {img0}
          {img1}
          {img2}
        </div>
        <div className="curr-player-items-row-2">
          {img3}
          {img4}
          {img5}
        </div>
      </section>
      {img6}
    </div>
}