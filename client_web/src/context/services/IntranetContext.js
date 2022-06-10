import React, { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { createUserService, getUserService } from '../../Request';

export const IntranetContext = createContext();

const IntranetContextProvider = ({children}) => {
    const { data: IntranetInfos, error } = useQuery(['get Intranet infos', 'Intranet'], getUserService, { refetchInterval: 3000 }); //TODO
    const [isIntraSwitched, setIntranetSwitch] = useState(false)

    useEffect(() => {
        if (error) {
            createUserService({
                collection: 'Intranet',
                data: {
                    access_token: "empty"
                },
                refresh_token: "empty"
            })
        }
    }, [error])
    return (
        <IntranetContext.Provider value={{ IntranetInfos, isIntraSwitched, setIntranetSwitch }}>
            {children}
        </IntranetContext.Provider>
    )
}

export default IntranetContextProvider