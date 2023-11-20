import { useState, useEffect, useRef } from 'react';
import GameOver from './components/GameOver';
import Scoreboard from './components/Scoreboard';
import Gameboard from './components/Gameboard';
import Genre from './components/Genre';
import ClipLoader from "react-spinners/ClipLoader";
import { getMasterMovieList } from './funcs/getMovies';
import { shuffle } from './funcs/shuffle';
import { genres } from './genres';

function App() {
  const NUM_OF_CARDS = 10;
  const [score, setScore]                       = useState(0);
  const [highScore, setHighScore]               = useState(0);
  const [masterMovieList, setMasterMovieList]   = useState([]);
  const [currentMovieList, setCurrentMovieList] = useState([]);
  const [clickedMovieList, setClickedMovieList] = useState([]);
  const [genre, setGenre]                       = useState(null);
  const [selectGenre, setSelectGenre]           = useState(true);
  const [isOver, setIsOver]                     = useState(false);
  const [gameWon, setGameWon]                   = useState(false);
  const [loading, setLoading]                   = useState(false);
  const firstRender                             = useRef(true);
  
  useEffect(() => {  
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    else {
      getMasterMovieList(genre)
        .then(newMasterMovieList => { 
          setMasterMovieList(newMasterMovieList);
          updateCurrentMovieList(newMasterMovieList);
          setLoading(false);
        })
    }
  }, [genre]);

  const updateClickedMovieList = (movie) => {
    const newClickedMovieList = clickedMovieList.concat(movie);
    setClickedMovieList(newClickedMovieList)
  }

  const updateCurrentMovieList = (arr) => {
    const shuffledMovieList = shuffle(arr);
    const newCurrentMovieList = shuffledMovieList.slice(0, NUM_OF_CARDS);
    setCurrentMovieList(newCurrentMovieList);
  }

  const increaseHighScore = () => {
    const newHighScore = highScore + 1;
    setHighScore(newHighScore);
  }

  const increaseScore = () => {
    const newScore = score + 1;
    setScore(newScore);
  }

  const playAgain = (e) => {
    e.preventDefault();
  
    setScore(0);
    setClickedMovieList([]);
    setIsOver(false);
    setGameWon(false);

    if (e.target.id === 'new-genre-btn') { setSelectGenre(true) }
    else { updateCurrentMovieList(masterMovieList) }
  }

  const handleClick = (e) => {
    e.preventDefault();
    const id = e.target.parentNode.id;
    const clickedMovie = currentMovieList.filter(movie => movie.id === id)[0];

    // check if game over first
    const doubleClick = clickedMovieList.some(movie => movie.title === clickedMovie.title)
    if (doubleClick) { 
      setIsOver(true);
      return;
    }

    else {
      updateClickedMovieList(clickedMovie);
      
      if (score === highScore) { increaseHighScore() }
      increaseScore();
      
      if (score === masterMovieList.length - 1) { // max score is equal to the length of the movies in the masterMovieList
        setGameWon(true);
        setIsOver(true);
        return;
      }
      
      updateCurrentMovieList(masterMovieList); // grab new random list of 10 movies
    }
  }

  const handleSelectGenre = (e) => {
    e.preventDefault();
    const newGenre = e.target.previousSibling.value
    
    // only trigger a genre change
    if (newGenre !== genre) { 
      setGenre(newGenre);
      setLoading(true);
    } 
    else { updateCurrentMovieList(masterMovieList) }
 
    setSelectGenre(false);
  }

  return (
    <>
      <GameOver
        isOver={isOver}
        gameWon={gameWon}
        score={score}
        highScore={highScore}
        playAgain={playAgain}
      />
      <div className='header'><h1>Movie Memory Card React App</h1></div>
      <Scoreboard
        genre={genre}
        score={score}
        highScore={highScore}
      />
      {selectGenre
                    ?
                      <Genre 
                        genres={genres}
                        handleSelectGenre={handleSelectGenre}
                      />
                    :
                      loading
                              ?
                                <div id="loading-spinner">
                                  <ClipLoader 
                                      loading={loading}
                                      color={'#149ECA'}
                                      size={100}  
                                  />
                                </div>
                              :
                                <Gameboard
                                  isOver={isOver}
                                  currentMovieList={currentMovieList}
                                  handleClick={handleClick}
                                />
      }
    </>
  )
}

export default App;