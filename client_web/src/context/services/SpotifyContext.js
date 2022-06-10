import React, { createContext, useEffect, useState } from 'react'
import { createUserService, getUserService } from '../../Request';
import { useQuery } from 'react-query';


export const SpotifyContext = createContext();

const SpotifyContextProvider = ({children}) => {
    const { data: SpotifyInfos, error } = useQuery(['get Spotify infos', 'Spotify'], getUserService, { refetchInterval: 3000 }); //TODO
    const [isModalOpenSpotify, setIsModalOpenSpotify] = useState(false)

    useEffect(() => {
        if (error) {
            createUserService({
                collection: 'Spotify',
                data: {
                    access_token: "empty"
                },
                refresh_token: "empty"
            })
        }
    }, [error])
    return (
        <SpotifyContext.Provider value={{ SpotifyInfos, isModalOpenSpotify, setIsModalOpenSpotify }}>
            {children}
        </SpotifyContext.Provider>
    )
}

export default SpotifyContextProvider
