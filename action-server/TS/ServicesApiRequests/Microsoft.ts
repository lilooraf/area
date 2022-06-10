
import axios from 'axios';

export const getMail = async (access_token: string) => {
    return await axios('https://graph.microsoft.com/v1.0/me/messages', {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${access_token}`,
        'outlook.body-content-type' : 'text'}
    })
    .then(response => { return { success: true, data: response} })
    .catch(error => { return { success: false, error} })
}

export const sendMail = async (access_token: string, receiver: string, subject: string, message: string) => {
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
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
        data: {
            'message': sendMail
        }
    })
    .then(response => { return { success: true, data: response} })
    .catch(error => { return { success: false, error} })
}

export const createEvent = async (access_token: string, content: string, start: string, end: string, subject: string) => {
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
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
        data: event
    })
    .then(response => { return { success: true, data: response} })
    .catch(error => { return { success: false, error} })
}

export const getEvents = async (access_token: string) => {
    return await axios('https://graph.microsoft.com/v1.0/me/calendar/events', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
    })
    .then(response => { return { success: true, data: response} })
    .catch(error => { return { success: false, error} })
}

export const createNote = async (access_token: string, name: string) => {
    return await axios('https://graph.microsoft.com/v1.0/me/onenote/notebooks', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
        data: {
            'displayName': name
        }
    })
    .then(response => { return { success: true, data: response} })
    .catch(error => { return { success: false, error} })
}
