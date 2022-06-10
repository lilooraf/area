import React, { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { createUserService, getUserService } from '../../Request';


export const YoutubeContext = createContext();

const YoutubeContextProvider = ({children}) => {
    const { data: YoutubeInfos, error } = useQuery(['get Youtube infos', 'Youtube'], getUserService, { refetchInterval: 80000 }); //TODO
    const [isModalOpenYoutube, setIsModalOpenYoutube] = useState(false)

    useEffect(() => {
        if (error) {
            createUserService({
                collection: 'Youtube',
                data: {
                    access_token: "empty"
                },
                refresh_token: "empty"
            })
        }
    }, [error])
    return (
        <YoutubeContext.Provider value={{ YoutubeInfos, isModalOpenYoutube, setIsModalOpenYoutube }}>
            {children}
        </YoutubeContext.Provider>
    )
}

export default YoutubeContextProvider
