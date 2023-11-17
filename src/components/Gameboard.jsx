import Card from "./Card"

export default function Gameboard(props) {
    const {
        currentMovieList,
        handleClick
    } = props;

    return (       
        <>
            <ul id='game-board'>
                {currentMovieList.map(movie => (
                    <li key={movie.id} id={movie.id}>
                        <Card 
                            url={movie.src}
                            handleClick={handleClick}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}