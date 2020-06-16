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
                    return <Match
                                match={match}
                                name={this.state.name}
                                patch={this.props.patch}
                                key={match.details.matchId}
                                champions={this.props.champions}
                                spells={this.props.spells}
                                runes={this.props.runes}
                                region={this.props.region}
                            />
                })}
            </div>
        )
    }
}

export default withRouter(History);