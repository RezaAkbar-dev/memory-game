import { use, useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './styles/App.css'
// import initialCards from './data/cardsData'
import { shuffleArray } from './utils/shuffle'
import Scoreboard from './components/Scoreboard'
import Cardgrid from './components/Cardgrid'

function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score,setScore] = useState(0);
  const [highScore,setHighScore] = useState(0);
  const [clickedCards,setClickedCards] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);

        const respon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
        const data = await respon.json();

        const detailPromise = data.results.map(async (pokemon, index) => {
          const detailResponse = await fetch(pokemon.url);
          const detailData = await detailResponse.json();

          return {
            id:index+1,
            name: pokemon.name.toUpperCase(),
            image:detailData.sprites.front_default,
          };
        });

        const formattedCards = await Promise.all(detailPromise);

        setCards(formattedCards);
        setIsLoading(false)
        
      } catch (error) {
        console.error('Gagal mengambil data dari PokeAPI', error)
        setIsLoading(false)
      }
    }
    fetchPokemonData();
  },[]);

  const handleCardClick = (id) => {
    if(clickedCards.includes(id)){
      alert("Anda Menekan Kartu Yang Sama")

      if (score > highScore){
        setHighScore(score);
      }
      setScore(0);
      setClickedCards([]);
    } else {
      setScore((prevScore) => prevScore + 1);

      setClickedCards((prevIds) => [...prevIds,id]);
    }
    setCards((prevCards) => shuffleArray(prevCards));
  }

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

  if(isLoading){
    return (
      <div className='game-container'>
        <h1>Sedang Menangkap Pokemon....Sebentar yaa</h1>
      </div>
    )
  }

  return (
    <div className='game-container'>
      <header className='header'>
        <h1>Poke-Memory Card Game</h1>
        
        <Scoreboard score={score} highScore={highScore}/>

        <hr />
      </header>

      <main>
        <Cardgrid cards={cards} handleCardClick={handleCardClick} />
      </main>
    </div>
  )
}

export default App
