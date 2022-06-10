import React, { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { createUserService, getUserService } from '../../Request';

export const MoviedbContext = createContext();

const MoviedbContextProvider = ({children}) => {
    const { data: MoviedbInfos, error } = useQuery(['get Moviedb infos', 'Moviedb'], getUserService, { refetchInterval: 80000 }); //TODO
    const [isMoviedbSwitched, setMoviedbSwitch] = useState(false)

    useEffect(() => {
        if (error) {
            createUserService({
                collection: 'Moviedb',
                data: {
                    access_token: "empty"
                },
                refresh_token: "empty"
            })
        }
    }, [error])
    return (
        <MoviedbContext.Provider value={{ MoviedbInfos, isMoviedbSwitched, setMoviedbSwitch }}>
            {children}
        </MoviedbContext.Provider>
    )
}

export default MoviedbContextProvider