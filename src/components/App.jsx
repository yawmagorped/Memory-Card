import '../styles/App.css'
import Header from './Header'
import CardPack from './CardPack'
import { useState } from 'react'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
 
  function handleScore(state) {
    if (state === "reset") {
      setScore(0)
      return;
    }

    setScore(prevScore => {
      const newScore = prevScore + 1;

      if (newScore >= bestScore) {
        setBestScore(newScore);
      }

      return newScore
    });
  }

  return (
    <>
      <Header />
      <div className="score">
        <p>score: {score}</p>  
        <p>best score: {bestScore}</p>
      </div>
      <CardPack handleScore={handleScore}/>
    </>
  )
}

export default App
