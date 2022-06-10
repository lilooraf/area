import axios from 'axios'

const getPlanningRequest = async (autolog: string, start: string, end: string) =>
{
    // FORMAT: YYY-mm-dd
    const request = `https://intra.epitech.eu/${autolog}/planning/load?format=json&start=${start}&end=${end}`
    return axios.get(request)
                .then((res) =>    {return res})
                .catch((error) => {return error})
}

const getNotificationRequest = async (autolog: string, message_type: string) =>
{
    const request = `https://intra.epitech.eu/${autolog}/user/notification/${message_type}?format=json`
    return axios.get(request)
                .then((res) =>    {return res})
                .catch((error) => {return error})
}

////////////////////////////////////////////////
// HERE Function that format message in better format
////////////////////////////////////////////////
export const _messageObjectFormater = (message: any) =>
{
    return {
        title: message.title,
        id: message.id,
        class: message.class
    }
}

////////////////////////////////////////////////
// HERE Function that format activities in our own format
////////////////////////////////////////////////
export const _activityObjectFormater = (activity: any) =>
{
    return {
        title: activity.acti_title,
        isRegister: activity.event_registered,
        start: activity.allowed_planning_start,
        begin: activity.allowed_planning_end,
        module_code: activity.codemodule,
        module_title: activity.titlemodule,
        isRegisterModule: activity.module_registered,
        id: activity.codeacti
    }
}

////////////////////////////////////////////////
// HERE Function that catch new activities on intranet
////////////////////////////////////////////////
export const _check_new_activities = async (autolog: string, start: string, end: string) =>
{
    let res = await getPlanningRequest(autolog, start, end)
    let activity_array: any = []
    // all planing event is in res.data[] (Array) ONLY MODULE YOU ARE REGISTER
    res.data.map((item: any) => {
        if (item.module_registered === false)
            return
        activity_array.push(_activityObjectFormater(item))
    })
    return { success: true, data: activity_array }
}

////////////////////////////////////////////////
// HERE Function that catch new event register
////////////////////////////////////////////////
export const _check_new_activities_register = async (autolog: string, start: string, end: string) =>
{
    let res = await getPlanningRequest(autolog, start, end)
    let activity_array: any = []
    // all planing event is in res.data[] (Array) ONLY ACTIVITIES YOU ARE REGISTER
    res.data.map((item: any) => {
        if (item.event_registered !== "registered")
            return
        activity_array.push(_activityObjectFormater(item))
    })

    return { success: true, data: activity_array }
}

////////////////////////////////////////////////
// HERE Function that catch new event register
////////////////////////////////////////////////
export const notificationCheck = async (autolog: string) => {
    let res = await getNotificationRequest(autolog, "message")
    let arr = res.data.map((item: any) => {return _messageObjectFormater(item)})
    return { success: true, data: arr }
}
