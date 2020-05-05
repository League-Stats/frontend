import React from 'react';
import axios from 'axios';
import './sass/Match.sass'

class Match extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: props.data,
            currentRegion: props.currentRegion,
            matchDetails: [],
        }
    }

    componentDidMount(){
        axios.request({
            method: 'POST',
            url: `https://hextechgg.herokuapp.com/api/summoner/matchdetails/`,
            data: {
              summonerRegion: this.state.currentRegion,
              matchId: this.state.data.gameId
            },
          })
            .then(res => {
              this.setState({
                matchDetails: res.data
              })
            })
            .catch(error => {
              console.log(error)
            })
    }

    render(){
        console.log(this.state.currentRegion, this.state.data.gameId)
        return(
            <div>
                {this.state.matchDetails.queueId}
            </div>
        )
    }
}

export default Match;