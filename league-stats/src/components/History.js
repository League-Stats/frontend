import React from 'react';
import Match from './Match';
import './sass/History.sass'
import axios from 'axios';

class History extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            matchDetails: [],
        }
    }

    // sort the game details by gameCreation
    async componentDidMount(){
        const matchPromises = this.props.history.slice(0, this.props.showGames).map(game => {
            return axios.request({
                method: 'POST',
                url: `https://hextechgg.herokuapp.com/api/summoner/matchdetails/`,
                data: {
                    summonerRegion: this.props.currentRegion,
                    matchId: game.gameId
                },
            })
        })

        const matchDetails = await Promise.all(matchPromises);
        console.log(matchDetails);
    }

    render(){
        return(
            <div>hi</div>
        )
    }
}

// const History = (props) => {
    

//     return(
//         <div>
//             {props.history.slice(0, props.showGames).map(game => {
//                 return <Match name={props.name} data={game} currentRegion={props.currentRegion}/>
//             })}
//         </div>
//     )
// }

export default History;