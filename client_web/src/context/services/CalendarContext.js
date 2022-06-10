import React, { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import {createUserService, getUserService } from '../../Request';

export const CalendarContext = createContext();

const CalendarContextProvider = ({children}) => {
    const { data: CalendarInfos, error } = useQuery(['get Calendar infos', 'Calendar'], getUserService, { refetchInterval: 80000 }); //TODO
    const [isCalendarSwitched, setCalendarSwitch] = useState(false)

    useEffect(() => {
        if (error) {
            createUserService({
                collection: 'Calendar',
                data: {
                    access_token: "empty"
                },
                refresh_token: "empty"
            })
        }
    }, [error])
    return (
        <CalendarContext.Provider value={{ CalendarInfos, isCalendarSwitched, setCalendarSwitch }}>
            {children}
        </CalendarContext.Provider>
    )
}

export default CalendarContextProvider