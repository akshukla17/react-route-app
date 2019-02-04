import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';
// import User from './components/User';
const User = (params) => {
  // console.log(match.params)
  return <h1>Hello User {params.userName}</h1>
}
class App extends Component {
  state = {
    loggedIn: false
  }

  handleLogin = () => {
    // console.log(prevState);
    this.setState(prevState => ({

      loggedIn: !prevState.loggedIn
    }))
  }
  render() {
    return (
      <Router>
        <div className="App" >
          <Prompt
            when={!this.state.loggedIn}
            message={(location) => {
              return location.pathname.startsWith('/user') ? 'Are you sure?' : true;
            }}
          />
          <ul>
            <li><NavLink to='/' exact activeStyle={{ color: 'green', backgroundColor: 'yellow' }}>Home</NavLink></li>
            <li> <NavLink to='/about' activeStyle={{ color: 'green', backgroundColor: 'yellow' }} > About</NavLink></li>
            <li> <NavLink to='/user/ajay' activeStyle={{ color: 'green', backgroundColor: 'yellow' }}>Ajay</NavLink></li>
            <li> <NavLink to='/user/raghav' activeStyle={{ color: 'green', backgroundColor: 'yellow' }}>Raghav</NavLink></li>
          </ul>
          <input type='submit' value={this.state.loggedIn ? 'Log out' : 'Log in'}
            onClick={this.handleLogin.bind(this)} style={{ paddingRight: '10px', float: 'right', margin: '10px' }}>
          </input>
          <Route path='/' exact strict render={() => { return <h1>Welcome Home</h1> }}></Route>
          <Route path='/about' exact strict render={() => { return <h1>Welcome About</h1> }}></Route>
          <Route path='/user/:userName' strict exact render={({ match }) => (
            this.state.loggedIn ? (<User userName={match.params.userName} />) : (<Redirect to='/' />)
          )} />
        </div>
      </Router >);
  }
}

export default App;
