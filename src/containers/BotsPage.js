import React, { Component } from "react";
import BotCollection from "./BotCollection"
const botUrl = 'http://localhost:6001/bots'

class BotsPage extends Component {
  state = {
    bots: [],
    draftBots: [],
  }

  componentDidMount() {
    fetch(botUrl)
      .then(res => res.json())
      .then(bots => this.setState({ bots }))
      .then(console.log("bots fetched"))
  }

  draftBot = (bot) => {
    this.setState({draftBots: [...this.state.draftBots, bot] }) 
  }

  render() {

    return ( 
    <div>
        
        <BotCollection armyBot={this.draftBot}  bots={this.state.bots} />
    </div>
    )
  }
}

export default BotsPage;
