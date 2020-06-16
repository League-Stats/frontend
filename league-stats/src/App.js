import React from 'react';
import '../src/components/sass/App.sass';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
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
      showGames: 5,
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
      champions: [],
      spells: [],
      runes: [],
    }
  }

  async componentDidMount(){
    const getPatch = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
    const patch = getPatch.data.shift()

    const getChampions = await axios(`http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`)
    const champions = Object.values(getChampions.data.data)

    const getSpells = await axios(`http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/summoner.json`)
    const spells = Object.values(getSpells.data.data)

    const getRunes = await axios(`http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`)
    const runes = getRunes.data

    this.setState({
      patch,
      champions,
      spells,
      runes
    })
  }

  handleChanges = e => this.setState({ value: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push(`/profile/${this.state.current}/${this.state.value}`)

    axios.get(`https://hextechgg.herokuapp.com/api/summoner/profile/${this.state.current}/${this.state.value}`)
    .then((res) => {
      this.setState({
        summoner: {
          name: res.data.name,
          icon: res.data.icon,
          level: res.data.level,
        },
        rank: res.data.rank
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
            <Link to={`/profile/${this.state.current}/${this.state.value}`} className="nav-link">PROFILE</Link>
            <Link to={`/matchhistory/${this.state.current}/${this.state.value}`} className="nav-link">MATCH HISTORY</Link>
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
            <Route path="/matchhistory/:region/:name">
              <History
                patch={this.state.patch}
                champions={this.state.champions}
                spells={this.state.spells}
                runes={this.state.runes}
                region={this.state.current}
              />
            </Route>
          </div>
          <div className="rank-display">
            <Route path="/profile/:region/:name">
              <RankContainer rank={this.state.rank}/>
            </Route>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
