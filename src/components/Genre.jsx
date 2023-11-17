export default function Genre(props) {
    const { genres, handleSelectGenre } = props;

    return (       
        <div id="select-genre-container">
            <h3>Select Genre</h3>
            <select id="select-genre-menu" required>
                {genres.map(genre => (
                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                ))}
            </select>
            <button id="select-genre-btn" onClick={handleSelectGenre}>Play</button>
        </div>
    )
}