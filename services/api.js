import axios from 'axios';

// GET
export const popularMovies = async () => {
        return await axios.get(`${process.env.BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&page=1`)
            .then((response) => response.data.results)
            .catch((error) => console.log(error))
}