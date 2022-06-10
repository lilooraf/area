import axios from 'axios'
import { hashPwd } from './utils'

                                 /* API CALL */

export const getPlaylistItem = async (id, token) => {
    return await axios(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const getUserProfile = async (token) => {
    return await axios(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const createPlaylist = async (token, name, description) => {
    var userId = getUserProfile(token)

    return await axios(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: ({
            name: name,
            description: description
        })
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const addItemPlaylist = async (token, playlistId, uri) => {
    return await axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uri}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const searchTrack = async (token, query) => {
    return await axios(`https://api.spotify.com/v1/search?q=${query}$type=track`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const notificationIntra = async (mail, type) => {
    return await axios(`https://intra.epitech.eu/user/${mail}/notification/${type}?format=json`, {
        method: 'GET'
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const TheMovieDb_getTrending = async (API_KEY) => {
    return await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    .then(response => { return response })
    .catch(error => { return error })
}

export const TheMovieDb_getReviewOnFilm = async (API_KEY, filmId) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${filmId}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
    .then(response => { return response })
    .catch(error => { return error })
}

export const getMail = async (token) => {
    return await axios('https://graph.microsoft.com/v1.0/me/messages', {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`,
        'outlook.body-content-type' : 'text'}
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const sendMail = async (token, receiver, subject, message) => {
    const sendMail = {
        message: {
            subject: subject,
            body: {
                contentType: "Text",
                content: message
            },
            toRecipients: [
            {
                emailAddress: {
                    address: receiver
                }
            }
            ],
        },
    };

    return await axios('https://graph.microsoft.com/v1.0/me/sendMail', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: {
            'message': sendMail
        }
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const createEvent = async (token, content, start, end, subject) => {
    const event = {
        subject: subject,
        body: {
          contentType: "HTML",
          content: content
        },
        start: {
            dateTime: start,
            timeZone: "Pacific Standard Time"
        },
        end: {
            dateTime: end,
            timeZone: "Pacific Standard Time"
        },
      };

      return await axios('https://graph.microsoft.com/v1.0/me/calendar/events', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: event
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const getEvent = async (token) => {
    return await axios('https://graph.microsoft.com/v1.0/me/calendar/events', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const createNote = async (token, name) => {
    return await axios('https://graph.microsoft.com/v1.0/me/onenote/notebooks', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: {
            'displayName': name
        }
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const addYoutubePlaylist = async(apiKey, id, token, title) => {
    return await axios(`https://youtube.googleapis.com/youtube/v3/playlists?part=${id}&key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: {
            'snippet.title': title
        }
    })
    .then(response => { return response })
    .catch(error => { return error })
}

export const getSubscriptions = async (id, token) => {
    return await axios(`https://www.googleapis.com/youtube/v3/subscriptions?part=${id}&mine=1`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}




                                    /* API CALL FOR BDD EXCHANGES */


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------SERVICE---------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

export const createUserService = async (data) => {
    console.log("value YES", data.data.access_token)
    return await axios(`http://localhost:8080/collection/`, {
        method: 'POST',
        data: {
            service: data.collection,
            access_token: data.data.access_token,
            refresh_token: "empty"
        }
    })
}

export const getUserService = async (collection) => {
    return await axios(`http://localhost:8080/collection/${collection.queryKey[1]}`, {
        method: 'GET'
    }).then((res) => {
        return (res);
    })
}

export const updateUserServiceStatus = async (data) => {
    return await axios(`http://localhost:8080/collection/${data.collection}`, {
        method: 'PUT',
        data: {
            ...data.data
        }
    })
}
//----------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------USER--------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

export const deleteAccount = async () => {
    return await axios(`http://localhost:8080/users/1`, {
        method: 'DELETE',
    }).then(response => {
        if (response.status === 200) {
            window.location = `http://localhost:8081/`
        }
    });
}

export const resetPassword = async (name) => {
    return await axios(`http://localhost:8080/users/1`, {
        method: 'PUT',
        data: {
            update: true,
            reset: true,
            email: name
        }
    }).then(response => {
        if (response.data.success === true) {
            window.location = (`http://localhost:8081/`)
        }
    });
}

export const logoutAcccount = async () => {
    return await axios(`http://localhost:8080/users/1`, {
        method: 'PUT',
        data: {
            signout: true
        }
    }).then(response => {
        if (response.status === 200) {
            window.location = `http://localhost:8081/`
        }
    });
}

export const createAccount = async (name, password) => {
    return await axios(`http://localhost:8080/users/`, {
        method: 'POST',
        data: {
            email: name,
            password: hashPwd(password).toString()
        }
    }).then(response => {
        if (response.status === 201) {
            window.location = `http://localhost:8081/Home`
        }
    });
}

export const infoAccount = async (log) => {
    return await axios(`http://localhost:8080/users/1`, {
        method: 'GET'
    }).then(response => {
        return response
    });
}

export const loginAccount = async (name, pwd, err) => {
    return await axios(`http://localhost:8080/users/1`, {
        method: 'PUT',
        data: {
            signin: true,
            email: name,
            password: hashPwd(pwd).toString()
        }
    }).then(response => {
        if (response.data.success === true) {
            window.location = `http://localhost:8081/Home`
        } else {
            err(
                <div className="ml-4 text-xs text-red-500 ">
                    Verity your information or create an account.
                </div>
            )
        }
    });
}
//----------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------SERVICES-AVAILABLE------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
export const getService = async (services) => {
    return await axios(`http://localhost:8080/services-available/`, {
        method: 'GET'
    }).then(response => {
        services(response.data.body)
    })
}

export const getOneService = async (name, stock) => {
    return await axios(`http://localhost:8080/services-available/${name}`, {
        method: 'GET'
    }).then(response => {
        stock(response.data.body)
    })
}

//----------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------LINKS--------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
export const createLink = async (name, triggerApp, reactApp, action, reaction, infoAction, infoReaction) => {
    return await axios(`http://localhost:8080/links/`, {
        method: 'POST',
        data: {
            link_name: name,
            trigger_app: triggerApp,
            react_app:reactApp,
            trigger_action: action,
            react_action: reaction,
            info_action: infoAction,
            info_react: infoReaction,
            activated: true,
        }
    }).then(response => {
        console.log(response)
        if (response.data.success === true) {
            window.location.reload()
        }
    })
}

export const getLinks = async (stock) => {
    return await axios('http://localhost:8080/links/', {
        method: 'GET'
    }).then(response => {
        stock(response.data.data)
    })
}

export const deleteLink = async (uuid) => {
    return await axios(`http://localhost:8080/links/${uuid}`, {
        method: 'DELETE'
    })
}

export const updateLink = async (uuid, state) => {
    return await axios(`http://localhost:8080/links/${uuid}`, {
        method: 'PUT',
        data: {
            activated: !state
        }
    })
}


//----------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////
