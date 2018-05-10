import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import FriendsList from './components/FriendsList.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      name: '',
      age: '',
      email: '',
    }
  }

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value })

    const friendNew = {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
    };

    axios.post('http://localhost:5000/friends', friendNew)
      .then(response  => {
        this.setState({ friends: response.data, name: '', age: '', email: '' });
      });
  }
  componentDidMount() {
    axios.get('http://localhost:5000/friends')
      .then(response => this.setState({ friends: response.data }))
  }



  render() {
    return (
      <div>
        <FriendsList friends={this.state.friends} />
        <form>
          <input
            name='name'
            type='text'
            placeholder='Name'
            value={this.state.name}
            onChange={this.handleOnChange}
            />
          <input  
          name='age'
          type='text'
          placeholder='Age'
          value={this.state.age}
          onChange={this.handleOnChange}
            />
          <input 
            name='email'
            type='text'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleOnChange}
            />

            <button onClick= {this.saveFriend}>add</button>

            </form>
      </div>
        );
      }
    }
    
    export default App;
