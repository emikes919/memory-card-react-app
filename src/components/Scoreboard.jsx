export default function Scoreboard(props) {
    const { 
        genre,
        score,
        highScore
    } = props;

    return (
        <div id="score-board">
            <div>Genre: {genre ? genre : 'select below'}</div>
            <div id="current-score">Current score: {score}</div>
            <div id="high-score">High score: {highScore}</div>
        </div>
    )
}