import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

export const Footer = () => {
    const {isLogin} = useContext(AuthContext)

    return (
        <footer className=" absolute w-full flex justify-center px-4 text-gray-100 bg-gray-800">
            <div className="container py-6">
                <h1 class="text-center text-lg font-bold lg:text-2xl">
                    Area makes you happier <br/> More than 3 people rely on Area to take care of their tedious tasks.
                </h1>

                <hr className="h-px mt-6 bg-gray-700 border-none" />

                <div className="flex flex-col items-center justify-between mt-6 md:flex-row">
                    <div>
                        <Link to="/Home" className="_o6689fn">
                            <img src="./log.png" alt="logo" className=" w-16"></img>
                        </Link>
                    </div>
                    <div class="flex mt-4 md:m-0">
                        <div class="-mx-4">
                            {
                                Object.keys(isLogin).length !== 0 ? <>
                            <Link to="/Profile" className="px-4 text-sm">Profile</Link>
                            <Link to="/Routines" className="px-4 text-sm">Routine</Link>
                            <Link to="/Link" className="px-4 text-sm">Area</Link>
                            </> : <Link to="/" className="px-4 text-sm">Login</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
