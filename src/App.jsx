import React, { useEffect } from 'react';
import './App.css';           // App-specific styles
import { GameHeader } from './components/GameHeader';
import { Card } from './components/Card';
import { useState } from 'react';

export default function App() {
  const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];
const [cards,setCards]=useState([])
const [moves,setMoves]=useState(0)
const[score,setScore]=useState(0)
const [flippedCards,setFlippedCards]=useState([])
const[matched,setMatched]=useState([])
const intializeGame=()=>{
   const shuffledValues = [...cardValues];
  for (let i = shuffledValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledValues[i], shuffledValues[j]] = [shuffledValues[j], shuffledValues[i]];
  }
  const finalCards=shuffledValues.map((value,index)=>({
    id:index,
    value,
    isFlipped:false,
    isMatched:false,
  }))
 setCards(finalCards)
}  
useEffect(()=>{
 intializeGame()
},[])
const handleClick=(card)=>{
  if(card.isFlipped||card.isMatched) return;
  const updatedCards=cards.map((c)=>
    c.id===card.id?{...c,isFlipped:true} : c
)
setCards(updatedCards)
const newFlippedCards=[...flippedCards,card.id]
setFlippedCards(newFlippedCards)
if(newFlippedCards.length===2){
  const firstCard=updatedCards[newFlippedCards[0]]
  const secondCard=updatedCards[newFlippedCards[1]]
  setMoves((prev) => prev + 1);
  if(firstCard.value===secondCard.value){
    const matchedCards=updatedCards.map((c)=>
      newFlippedCards.includes(c.id)?{...c,isMatched:true}:c
    )
    setCards(matchedCards)
    setScore((prev)=>prev+1)
    setMatched((prev)=>[...prev,...newFlippedCards])
    setFlippedCards([])
  }
  else{
    setTimeout(()=>{
    const resetCards=updatedCards.map((c)=>
        newFlippedCards.includes(c.id) ? { ...c, isFlipped: false } : c
    )
     setCards(resetCards);
        setFlippedCards([]);
    },1000)
  }
}
}
return (
    <div className="app">
      <GameHeader scores={score} moves={moves} />
        {score === 8 && (
    <div className="winMessage">
      <h2>🎉 You completed the game! 🎉</h2>
    </div>
  )}

      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleClick}/>
        ))}
      </div>
        <button onClick={intializeGame}>Restart Game</button>
    </div>
  )
}
