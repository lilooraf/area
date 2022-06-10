import React, { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { createUserService, getUserService } from '../../Request';

export const MicrosoftContext = createContext();

const MicrosoftContextProvider = ({children}) => {
    const { data: MicrosoftInfos, error } = useQuery(['get Microsoft infos', 'Microsoft'], getUserService, { refetchInterval: 3000 }); //TODO
    const [isModalOpenMicrosoft, setIsModalOpenMicrosoft] = useState(false)

    useEffect(() => {
        if (error) {
            createUserService({
                collection: 'Microsoft',
                data: {
                    access_token: "empty"
                },
                refresh_token: "empty"
            })
        }
    }, [error])
    return (
        <MicrosoftContext.Provider value={{ MicrosoftInfos, isModalOpenMicrosoft, setIsModalOpenMicrosoft }}>
            {children}
        </MicrosoftContext.Provider>
    )
}

export default MicrosoftContextProvider