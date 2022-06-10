
import axios from 'axios';

export const getTranding = async() =>  {
    return await axios(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_CLIENT_ID}&part=snippet&chart=mostPopular`, {
        method: 'GET'
    })
    .then(response => {return "https://www.youtube.com/watch?v=" + response.data.item[0].id})
    .catch(error => {return error})
}
