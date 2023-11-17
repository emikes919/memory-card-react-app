export default function Card(props) {
    const { 
        url,
        handleClick
    } = props;

    return (
        <img 
            className="poster-img"
            alt="poster"
            src={url}
            onClick={handleClick}
        />
    )
}