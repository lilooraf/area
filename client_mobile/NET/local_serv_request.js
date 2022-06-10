import axios from 'axios'

// TODO Put IP and PORT in ENV
const ip_server = process.env.IP_SERVER
const port_server = process.env.SERVER_PORT

/////////////////////////////////////////////
////    CREATE A USER                    ////
/////////////////////////////////////////////
export const create_user = async (email, hashPwd) => 
{
    return await axios(`http://${ip_server}:${port_server}/users/`, {
        method: 'POST',
        data: {
            email: email,
            password: hashPwd
        }
    })
    .then(res => {return res})
    .catch(error => {return error})
}

/////////////////////////////////////////////
////    LOG A USER (login request)       ////
/////////////////////////////////////////////
export const login = async (email, hashPwd) => 
{
    return await axios(`http://${ip_server}:${port_server}/users/1`, {
        method: 'PUT',
        data: {
            signin: true,
            email: email,
            password: hashPwd.toString()
        }
    })
    .then(res => {return res})
    .catch(error => {return error})
}

/////////////////////////////////////////////
////    IS USER IS LOGGED               ////
/////////////////////////////////////////////
export const isLogged = async () => {
    return await axios(`http://${ip_server}:${port_server}/users/1`, {
        method: 'GET'
    })
    .then(res => { return (res.data != undefined && res.data.success == true) ? true : false})
    .catch(error => {return error})
}

/////////////////////////////////////////////
////    GET EMAIL FROM CONNECTED USER    ////
/////////////////////////////////////////////
export const getEmailCurrentUser = async () => {
    return await axios(`http://${ip_server}:${port_server}/users/1`, {
        method: 'GET'
    })
    .then(res => {return res.data.email})
    .catch(error => {return error})
}

/////////////////////////////////////////////
////    LOG OUT A USER                   ////
/////////////////////////////////////////////
export const logOut = async () => {
    return await axios(`http://${ip_server}:${port_server}/users/1`, {
        method: 'PUT',
        data: {
            signout: true
        }
    })
    .then(res => res.success === true)
    .catch(error => {return error})
}

/////////////////////////////////////////////
////    DELETE A USER                    ////
/////////////////////////////////////////////
export const deleteUser = async () => {
    return await axios(`http://${ip_server}:${port_server}/users/1`, {
        method: 'DELETE',
    })
    .then(res => res.success === true)
    .catch(error => {return error})
}

/////////////////////////////////////////////
////    GET ALL SERCIVES                 ////
/////////////////////////////////////////////
export const getAllServices = async () => {
    return await axios(`http://${ip_server}:${port_server}/services-available/`, {
            method: 'GET',
    })
    .then(res => {return res})
    .catch(error => {return error});
}

/////////////////////////////////////////////
////    GET ALL USER LINK                ////
/////////////////////////////////////////////
export const getCurrentUserLinks = async () => {
    return await axios(`http://${ip_server}:${port_server}/links/`, {
            method: 'GET',
    })
    .then(res => {return (res.data.success == true) ? res.data.data : "false"})
    .catch(error => {return error})
}

/////////////////////////////////////////////
////    DELETE A USER LINK               ////
/////////////////////////////////////////////
export const deleteLinkByUUID = async (uuid) => {
    return await axios(`http://${ip_server}:${port_server}/links/${uuid}`, {
            method: 'DELETE',
    })
    .then(res => {return res.data.success == true})
    .catch(error => {return error})
}

/////////////////////////////////////////////
////    CREATE A USER LINK               ////
/////////////////////////////////////////////
export const createUserLink = async (obj) => {
    return await axios(`http://${ip_server}:${port_server}/links/`, {
            method: 'POST',
            data: obj
    })
    .then(res => {return res.success})
    .catch(error => {return error});
}

/////////////////////////////////////////////
////    UPDATE A USER LINK               ////
/////////////////////////////////////////////
export const updateUserLink = async (obj, uuid) => {
    return await axios(`http://${ip_server}:${port_server}/links/${uuid}`, {
            method: 'PUT',
            data: obj
    })
    .then(res => {return res.success})
    .catch(() => {return false});
}

/////////////////////////////////////////////
////    GET INFO OF A LINK               ////
/////////////////////////////////////////////
export const getLinkInfo = async (uuid) => {
    return await axios(`http://${ip_server}:${port_server}/links/${uuid}`, {
            method: 'GET',
    })
    .then(res => {return res.data})
    .catch(() => {return false});
}
