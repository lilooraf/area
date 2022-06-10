const axios = require('axios');

module.exports.getPlaylistItems = async (accessToken, playlistID) => {
    //* developpment
        return {
            api_call: 'get_playlist_items',
            accessToken,
            playlistID
        }
    //*

    // return await axios(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // })
    // .then((response) => { return { success: true, data: response } })
    // .catch((error) => { return { success: false, error } })
}

module.exports.getUserProfile = async (accessToken) => {
    //* developpment
        return {
            api_call: 'get_user_profile',
            accessToken
        }
    //*

    // return await axios(`https://api.spotify.com/v1/me`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // })
    // .then((response) => { return { success: true, data: response } })
    // .catch((error) => { return { success: false, error } })
}

module.exports.createPlaylist = async (accessToken, playlistName, playlistDescription) => {
    //* getUserProfile is exported in this file, skipping fo now...
    accessToken;
    playlistName;
    playlistDescription;
    // const { _, data } = await getUserProfile(accessToken) //! all user info are returned, NEED TO GET USER_ID FROM RESPONSE

    // return await axios(`https://api.spotify.com/v1/users/${data}/playlists`, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //         'Content-Type': 'application/json'
    //     },
    //     data: ({
    //         name: playlistName,
    //         description: playlistDescription
    //     })
    // })
    // .then((response) => { return { success: true, data: response } })
    // .catch((error) => { return { success: false, error } })
}

module.exports.addItemsPlaylist = async (accessToken, playlistId, tracksURI) => {
    return await axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${tracksURI}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => { return { success: true, data: response } })
    .catch((error) => { return { success: false, error } })
}

module.exports.searchTrack = async (accessToken, query) => {
    return await axios(`https://api.spotify.com/v1/search?q=${query}$type=track`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then((response) => { return { success: true, data: response } })
    .catch((error) => { return { success: false, error } })
}
