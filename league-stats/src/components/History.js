import React from 'react';
import Match from './Match';
import './sass/History.sass'
import axios from 'axios';
import { withRouter } from 'react-router';

class History extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            history: []
        }
    }

    // sort the game details by gameCreation
    // async componentDidMount(){
    //     const matchPromises = this.props.history.slice(0, this.props.showGames).map(game => {
    //         const result = axios.request({
    //             method: 'POST',
    //             url: `https://hextechgg.herokuapp.com/api/summoner/matchdetails/`,
    //             data: {
    //                 summonerRegion: this.props.currentRegion,
    //                 matchId: game.gameId
    //             },
    //         })
    //         return result
    //     })

    //     const matchDetails = await Promise.all(matchPromises);
    //     const sortDetails = matchDetails.sort((a, b) => b.data.gameCreation - a.data.gameCreation)
    //     this.setState({
    //         matchDetails: sortDetails
    //     })
    // }
    
    getHistory = async () => {
        const { name, region } = this.props.match.params;

        const history = await axios.get(`https://hextechgg.herokuapp.com/api/summoner/matchhistory/${region}/${name}`)

        const sortHistory = history.data.sort((a, b) => b.details.gameCreation - a.details.gameCreation)

        this.setState({
            history: sortHistory
        })

        // console.log("history HERE ", this.state.history)
    }

    getName = async () => {
        const { name, region } = this.props.match.params;
        
        const getName = await axios.get(`https://hextechgg.herokuapp.com/api/summoner/profile/${region}/${name}`)
        
        this.setState({
            name: getName.data.name
        })
    }

    componentDidMount(){
        this.getHistory()
        this.getName()
    }

    render(){
        return(
            <div>
                {this.state.history.map(match => {
                    return <Match match={match} name={this.state.name} key={match.details.matchId} />
                })}
                {/* {this.state.matchDetails.map(game => {
                    return <Match
                                matchDetails={game.data}
                                matchGameId={this.state.matchGameId}
                                currentRegion={this.props.currentRegion}
                                name={this.props.name}
                                key={game.data.gameCreation}
                                patch={this.props.patch}
                            />
                })} */}
            </div>
        )
    }
}

export default withRouter(History);