import React, { useEffect, useState } from 'react'
import { deleteLink, getLinks, updateLink } from './Request'
import Switch from "react-switch";
import { Link } from 'react-router-dom';

export const Links = () => {
    const [links, setLinks] = useState([])

    useEffect(() => {
        getLinks(setLinks)
    }, [links, setLinks])

    console.log("value ==> ", Object.keys(links).length)
    return (
        <div className="min-h-screen">
            <div>
                <div className="flex justify-center">
                    <h1 className="text-3xl font-bold">Area</h1>
                </div>
                <br></br>
                {
                    Object.keys(links).length === 0 ?
                <div className="absolute inset-1/3">
                    <p className="  flex  justify-center text-4xl font-bold">No Areas found. Create a new one.</p>
                    <Link className=" italic mt-3 text-area-green flex justify-center underline text-lg" to="/Routines">Create link</Link>
                </div>
                 :
                <ul className="grid grid-cols-5 justify-center">
                        {links.map((val) => {
                            return(
                                <div className=" ml-3.5 bg-gray-100 hover:bg-white hover:shadow-lg flex border rounded mb-4 items-center">
                                    <span className=" flex justify-center border rounded-xl border-gray-200">
                                        <img src="./youtube.png" className=" w-11" alt="youtube" />
                                    </span>
                                    <span className=" flex justify-center border rounded-xl border-gray-200">
                                        <img src="./spotify.png" className=" w-11" alt="spotify" />
                                    </span>
                                    <div className="mb-2">
                                        <h2 className=" ml-5 font-bold">{val.link_name}</h2>
                                        <div className="mb-2"></div>
                                        <div className="flex ">
                                            <h4 className="ml-5 text-xs">{val.react_app}</h4>
                                            <h4 className=" ml-0.5 mr-0.5 text-xs">+</h4>
                                            <h4 className="text-xs">{val.trigger_app}</h4>
                                            <i onClick={() => deleteLink(val.uuid)} className=" cursor-pointer ml-3 far fa-trash-alt"></i>
                                        </div>
                                        <div className=" flex ml-5 mt-2">
                                            <Switch
                                                onChange={() => {updateLink(val.uuid, val.activated)}}
                                                checked={val.activated}
                                                className="react-switch"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </ul>
                }
            </div>
        </div>
    )
}
