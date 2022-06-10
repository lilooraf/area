import React, { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { createUserService, getUserService } from '../../Request';


export const OneNoteContext = createContext();

const OneNoteContextProvider = ({children}) => {
    const { data: OneNoteInfos, error } = useQuery(['get OneNote infos', 'OneNote'], getUserService, { refetchInterval: 80000 }); //TODO
    const [isOpenOneNoteSwitched, setOneNoteSwitch] = useState(false)

    useEffect(() => {
        if (error) {
            createUserService({
                collection: 'OneNote',
                data: {
                    access_token: "empty"
                },
                refresh_token: "empty"
            })
        }
    }, [error])
    return (
        <OneNoteContext.Provider value={{ OneNoteInfos, isOpenOneNoteSwitched, setOneNoteSwitch }}>
            {children}
        </OneNoteContext.Provider>
    )
}

export default OneNoteContextProvider