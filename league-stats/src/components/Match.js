import React from 'react';
import axios from 'axios';
import './sass/Match.sass'

class Match extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.name,
            data: props.data,
            currentRegion: props.currentRegion,
            matchDetails: [],
            team: null,
            result: null,
        }
    }
    
    componentDidMount(){
          // console.log("BEFORE", this.state.data)
        axios.request({
            method: 'POST',
            url: `https://hextechgg.herokuapp.com/api/summoner/matchdetails/`,
            data: {
              summonerRegion: this.state.currentRegion,
              matchId: this.state.data.gameId
            },
          })
            .then(res => {
              console.log(res.data)
              this.setState({
                matchDetails: [...this.state.matchDetails, res.data]
              })

            })
            .catch(error => {
              console.log(error)
            })
            console.log("AFTER", this.state.data)

            console.log(this.state.matchDetails)

    //     if(this.state.matchDetails.participantIdentities){
    //         let getPlayer = this.state.matchDetails.participantIdentities.find(player => player.player.summonerName === this.state.name);
    //         let playerNumber = getPlayer.participantId
    //         if(playerNumber < 6){
    //             this.setState({
    //                 team: 0
    //             })
    //         } else if(playerNumber > 5) {
    //             this.setState({
    //                 team: 1
    //             })
    //         }
    //     }

    //     if(this.state.matchDetails.teams){
    //         // console.log(this.state.matchDetails.teams[0].win)
    //         let firstTeamResult = this.state.matchDetails.teams
    //         // if(firstTeamResult === "Win" && this.state.team === 0){
    //         //     this.setState({
    //         //         result: true
    //         //     })
    //         // } else {
    //         //     this.setState({
    //         //         result: false
    //         //     })
    //         // }
    //     }
    }

    render(){

        // console.log(this.state.data.gameId)

        // let id = 0;
            
        // this.state.matchDetails.participantIdentities.player.find((player) => {
        //     if(player.summonerName === this.state.name) {
        //         id = player.participantId;
        //     }
        // });

        // console.log(id)

        // console.log("render", this.state.data)

        return(
            <div>
                {/* {this.state.matchDetails.queueId} */}
            </div>
        )
    }
}

export default Match;