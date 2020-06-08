import React from 'react';
import Match from './Match';
import './sass/History.sass'
import axios from 'axios';

class History extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            matchDetails: [],
            matchGameId: null
        }
    }

    // sort the game details by gameCreation
    async componentDidMount(){
        const matchPromises = this.props.history.slice(0, this.props.showGames).map(game => {
            const result = axios.request({
                method: 'POST',
                url: `https://hextechgg.herokuapp.com/api/summoner/matchdetails/`,
                data: {
                    summonerRegion: this.props.currentRegion,
                    matchId: game.gameId
                },
            })
            return result
        })

        const matchDetails = await Promise.all(matchPromises);
        const sortDetails = matchDetails.sort((a, b) => b.data.gameCreation - a.data.gameCreation)
        this.setState({
            matchDetails: sortDetails
        })
    }

    render(){
        return(
            <div>
                {this.state.matchDetails.map(game => {
                    return <Match
                                matchDetails={game.data}
                                matchGameId={this.state.matchGameId}
                                currentRegion={this.props.currentRegion}
                                name={this.props.name}
                                key={game.data.gameCreation}
                                patch={this.props.patch}
                            />
                })}
            </div>
        )
    }
}

export default History;