import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './styles/App.css'
import initialCards from './data/cardsData'
import { shuffleArray } from './utils/shuffle'

function App() {
  const [cards, setCards] = useState(initialCards);
  const [score,setScore] = useState(0);
  const [highScore,setHighScore] = useState(0);
  const [clickedCards,setClickedCards] = useState([]);

  // function handleCardClick(id){
  //   if(id.include(clickedCard)){
  //     setScore(0);
  //     shuffleArray(cards);
  //     clickedCards([]);
  //     setHighScore(score);
  //     return;
  //   }
  //   setScore(score + 1)
  //   shuffleArray(cards);
  //   clickedCard([...clickedCard,id]);
  // }

  return (
    <div>
      <h1>Poke-Memory Card Game</h1>

      <div>
          {cards.map((card) => {
            return (
              <div key={card.id}>
                <img src={card.image} alt={card.name} />
                <p>{card.name}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default App
