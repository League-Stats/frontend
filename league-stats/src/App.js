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
  }

  regionChange = e => {
    this.setState({ current: e.target.value})
  }

  render(){
    console.log(this.state.rank)
    return (
      <div className="App">
        <section className="section-left">
          <Info info={this.state.summoner} />
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
          <Route path="/history" component={History}/>
          <Route exact path="/">
            <RankContainer rank={this.state.rank}/>
          </Route>
        </section>
      </div>
    );
  }
}

export default App;
