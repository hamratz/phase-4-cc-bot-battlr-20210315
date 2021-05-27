import React, { Component } from "react";
import BotCollection from "./BotCollection"
import YourBotArmy from "./YourBotArmy"

const botUrl = 'http://localhost:6001/bots'
const headers = {
  Accepts: 'application/json',
  'Content-type': 'application/json',
}

class BotsPage extends Component {
  state = {
    bots: [],
  }

  componentDidMount() {
    fetch(botUrl)
      .then(res => res.json())
      .then(bots => this.setState({ bots }))
  }

  setBotDraft = (bot, draft) => {
    
    fetch(`${botUrl}/${bot.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({draft})
    }).then(() => {
      const newBot = {...bot, draft}
        this.setState({
          bots: this.state.bots.map((b) => (b === bot ? newBot : b)) 
      })
    })
    .catch(err => console.error(err))
  }

  draftBot = (bot) => {
    this.setBotDraft(bot, true)

    // const newBot = {...bot, draft: true}
    // this.setState({bots: this.state.bots.map((b) => (b === bot ? newBot : b)) })
    
    // if(!this.state.draftBots.includes(bot)) {
    //   this.setState({draftBots: [...this.state.draftBots, bot] })
    // }
  }

  dischargeBot = (bot) => {
    this.setBotDraft(bot, false)
    
    // const newBot = {...bot, draft: false}
    // this.setState({bots: this.state.bots.map((b) => (b === bot ? newBot : b)) })
    
    // this.setState({
    //   draftBots: [...this.state.draftBots.filter(b => b !== bot)]
    // })
  }

  killBot = (bot) => {
    // this.dischargeBot(bot)

    fetch(`${botUrl}/${bot.id}`, {
      method: 'DELETE',
      headers,
    }).then(() =>
      this.setState({
        bots: [...this.state.bots.filter((b) => b !== bot)],
      })
    )
    .catch(err => console.error(err))
  }


  render() {

    return ( 
    <div>
      <YourBotArmy 
        handleClick={this.dischargeBot} 
        handleKill={this.killBot} 
        bots={this.state.bots.filter((bot) => bot.draft)}/>
      <BotCollection 
        handleClick={this.draftBot}  
        handleKill={this.killBot} 
        bots={this.state.bots} />
    </div>
    )
  }
}

export default BotsPage;
