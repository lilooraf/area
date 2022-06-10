
import axios from 'axios';

export const getTrending = async () => {
    return axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=9b96b4ae542c609707a044224481dc1c`)
        .then(response => { return response })
        .catch(error => { return error })
}

export const getReview = async (filmId: string) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${filmId}/reviews?api_key=9b96b4ae542c609707a044224481dc1c&language=en-US&page=1`)
        .then(response => { return response })
        .catch(error => { return error })
}
