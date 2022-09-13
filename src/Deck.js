import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import './deck.css'

const Base_Url='https://www.deckofcardsapi.com/api/deck/'

 class Deck extends Component {
    constructor(props){
        super(props)
        this.state={deck:null,drawn:[]}
        this.handleClick=this.handleClick.bind(this)

    }
  async  componentDidMount(){
        let request=await axios.get(`${Base_Url}new/shuffle/`);
        this.setState({deck:request.data})
    }
    async handleClick(){
        let deck_Id=this.state.deck.deck_id;
       try {
        let Card_Url=`${Base_Url}${deck_Id}/draw/`
        let cardReq=await axios.get(Card_Url);
        if(!cardReq.data.success){
            throw new Error("No Card Remaining!!")
        }
        let card=cardReq.data.cards[0];
        this.setState(s=>({
            drawn:[...s.drawn,{
                id:card.code,
                image:card.image,
                name:`${card.value} of ${card.suit}`
            }]
        }))
    }
       
        catch (error) {
        alert(error)
       }
    } 
  render() {
    let cardComp=this.state.drawn.map(c=>(
        <Card key ={c.id} name={c.name} image={c.image}/>
    ))
    return (
      <div>
        <h1 className='title'>Deck of Cards</h1>
        <h2 className='title'>Made with React ♥</h2>
        
        <button className='the-btn' onClick={this.handleClick}>Click Me</button>
        <div className='deck-card'>{cardComp}</div>
      </div>
    )
  }
}

export default Deck
