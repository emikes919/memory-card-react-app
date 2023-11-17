
import { shuffle } from "./shuffle";
import { v4 as uuidv4 } from 'uuid';

const RAPID_API_URL = 'https://moviesminidatabase.p.rapidapi.com/movie/byGen/';
const RAPID_API_OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5597786e77msh91320d8bcac0839p149400jsn88cc4ccd9184',
		'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
	}
};

const OMDB_API_URL = 'http://www.omdbapi.com/'
const OMDB_API_KEY = '5be7ce10'

export const getRandomMovieList = async (genre) => {
    const url = `${RAPID_API_URL}${genre}`
	const response = await fetch(url, RAPID_API_OPTIONS);
	const result = await response.json();
    const list = result.results;
    return list;
}

export const getMoviePoster = async (imdbId) => {
    const url = `${OMDB_API_URL}?i=${imdbId}&apikey=${OMDB_API_KEY}`
    const response = await fetch(url);
    const result = await response.json();
    const poster = result.Poster;
    return poster;
}

export const getMasterMovieList = async (genre) => {
    const randomMovieList = await getRandomMovieList(genre);
    const shuffledMovieList = shuffle(randomMovieList);
    
    const posterUrlPromises = shuffledMovieList.map(async movie => {
        const url = await getMoviePoster(movie.imdb_id);
        const title = movie.title;
        return { title, url };
    });

    let newMasterMovieList = [];
    await Promise.all(posterUrlPromises)
        .then(movieObjects => {
            movieObjects.forEach(async obj => newMasterMovieList.push({ 
                id: uuidv4(),
                title: obj.title,
                src: await obj.url
            })) 
        }
    )

    return newMasterMovieList;
}