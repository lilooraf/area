import axios from 'axios';

export const getPlaylistItems = async (accessToken: String, playlistID : String) => {
    return await axios(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((response: any) => { return { success: true, data: response } })
    .catch((error: any) => { return { success: false, error } })
}

export const getUserProfile = async (accessToken : String) => {
    return await axios(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((response: any) => { return { success: true, data: response } })
    .catch((error: any) => { return { success: false, error } })
}

export const createPlaylist = async (accessToken : String, playlistName : String, playlistDescription : String) => {
    const { success, data }: any = await getUserProfile(accessToken)

    return await axios(`https://api.spotify.com/v1/users/${data.data.id}/playlists`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        data: ({
            name: playlistName,
            description: playlistDescription
        })
    })
    .then((response: any) => { return { success: true, data: response } })
    .catch((error: any) => { return { success: false, error } })
}

export const addItemsPlaylist = async (accessToken : String, playlistId : String, tracksURI : String) => {
    return await axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${tracksURI}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then((response: any) => { return { success: true, data: response } })
    .catch((error: any) => { return { success: false, error } })
}

export const searchTrack = async (accessToken : String, query : String) => {
    return await axios(`https://api.spotify.com/v1/search?q=${query}$type=track`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((response: any) => { return { success: true, data: response } })
    .catch((error: any) => { return { success: false, error } })
}
