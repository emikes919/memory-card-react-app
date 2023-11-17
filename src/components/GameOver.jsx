export default function GameOver(props) {
    const {
        isOver,
        gameWon,
        score,
        highScore,
        playAgain,
    } = props;

    return (       
        <>
            {isOver 
                    ?
                        <>
                            <div id="backdrop"></div>
                            <div id="game-over-modal">
                                {gameWon
                                        ?
                                            <p id="game-over-text">YOU WIN!</p>
                                        :
                                            <p id="game-over-text">GAME OVER!</p>
                                }
                                
                                <p className="game-over-score-text">Your score: {score}</p>
                                <p className="game-over-score-text">High score: {highScore}</p>
                                <p>Play again?</p>
                                <div id="play-again-btn-container">
                                    <button className="play-again-btn" id="same-genre-btn" onClick={playAgain}>Same genre</button>
                                    <button className="play-again-btn" id="new-genre-btn" onClick={playAgain}>New genre</button>
                                </div>
                            </div>
                        </>
                    :
                        <></>
            }    
        </>
    )
}