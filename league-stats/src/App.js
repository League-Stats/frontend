import React from 'react';
import '../src/components/sass/App.sass';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import Search from './components/Search';
import Info from './components/Info';
import History from './components/History';
import RankContainer from './components/RankContainer';

// TODO: FIX UNRANKED EMBLEM

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: "",
      summoner: {
        name: "Hextech GG",
        icon: 3367,
        level: 30,
      },
      rank: [],
      history: [],
      showGames: 10,
      patch: "10.10.3208608",
      current: "NA",
      regions: [
          { id: 0, locale: 'NA' },
          { id: 1, locale: 'KR' },
          { id: 2, locale: 'EUW' },
          { id: 3, locale: 'EUNE' },
          { id: 4, locale: 'JP' },
          { id: 5, locale: 'BR' },
          { id: 6, locale: 'LAN' },
          { id: 7, locale: 'LAS' }
      ],
    }
  }

  handleChanges = e => this.setState({ value: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    axios.request({
      method: 'POST',
      url: `https://hextechgg.herokuapp.com/api/summoner/summoner/`,
      data: {
        summonerName: this.state.value,
        summonerRegion: this.state.current
      },
    })
      .then(res => {
        this.setState({
          summoner: {
            name: res.data.name,
            icon: res.data.icon,
            level: res.data.level
          }
        })
      })
      .catch(error => {
        console.log(error)
      })

    axios.request({
      method: 'POST',
      url: `https://hextechgg.herokuapp.com/api/summoner/rank/`,
      data: {
        summonerName: this.state.value,
	      summonerRegion: "NA"
      },
    })
      .then(res => {
        this.setState({
          rank: res.data
        })
      })
      .catch(error => {
        console.log(error)
      })

    this.setState({ value: ''})

    axios.request({
      method: 'POST',
      url: `https://hextechgg.herokuapp.com/api/summoner/matchhistory/`,
      data: {
        summonerName: this.state.value,
        summonerRegion: this.state.current
      },
    })
      .then(res => {
        this.setState({
          history: res.data
        }) 
      })
      .catch(error => {
        console.log(error)
      })

    axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
    .then((res) => {
      this.setState({
        patch: res.data.shift()
      })
    })
  }


  regionChange = e => {
    this.setState({ current: e.target.value})
  }

  render(){
    return (
      <div className="App">
        <section className="section-left">
          <Info info={this.state.summoner} patch={this.state.patch} />
        </section>
        <section className="section-right">
          <div className="nav">
            <Link to="/" className="nav-link">PROFILE</Link>
            <Link to="/history" className="nav-link">MATCH HISTORY</Link>
            <Search
              value={this.state.value}
              handleChanges={this.handleChanges}
              handleSubmit={this.handleSubmit}  
              current={this.state.current}
              regions={this.state.regions}
              regionChange={this.regionChange}
            />
          </div>
          <div className="match-history">
            <Route path={`/history/`}>
              <History
                name={this.state.summoner.name}
                history={this.state.history}
                showGames={this.state.showGames}
                currentRegion={this.state.current}
                patch={this.state.patch}
                handleSubmit={this.handleSubmit}
              />
            </Route>
          </div>
          <div className="rank-display">
            <Route exact path="/">
              <RankContainer rank={this.state.rank}/>
            </Route>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
