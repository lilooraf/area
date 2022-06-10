import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import { useOuterClick } from './utils'
import { AuthContext } from './context/AuthContext'
import { logoutAcccount } from './Request'

const Navigationbar = () => {

    const {isLogin} = useContext(AuthContext)
    const [isOpen, setisOpen] = useState(false)
    const innerRef = useOuterClick(ev => { setisOpen(false) })

    return(
        <nav ref={innerRef} className=" border w-full flex relative justify-between items-center mx-auto px-8 h-20">
            <div className="inline-flex">
                <Link to="/Home" className="_o6689fn">
                    <img src="./logo.png" alt="logo" className=" w-16"></img>
                </Link>
                <div className="flex justify-center w-20 sm:w-40">
                    <span className=" text-xs sm:text-3xl pt-6 font-bold text-area-green">AREA 51</span>
                </div>
            </div>
            <div className="flex-initial">
                <div className="flex justify-end items-center relative">
                    <div className="block">
                        <div className="inline relative">
                            <button type="button" className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg" onClick={() => setisOpen(!isOpen) }>
                                <div className="pl-1">
                                    <i className="fas fa-bars"></i>
                                </div>
                                <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                                    <div className="flex justify-center p-12 px-1 py-0.5">
                                        <div className="relative">
                                            <i className="fas fa-user-circle text-4xl"></i>
                                            <div className={` z-50  ${ isOpen ? 'visible' : 'invisible'} absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl`}>
                                                {
                                                    Object.keys(isLogin).length !== 0 ? <><Link to="/Profile" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-area-green hover:text-white">Profile</Link>
                                                    <div className="py-2">
                                                        <hr></hr>
                                                    </div> </>: <></>
                                                }
                                                {
                                                    Object.keys(isLogin).length !== 0 ?
                                                    <><Link to="/Routines" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-area-green hover:text-white">
                                                    Routine
                                                </Link>
                                                <div className="py-2">
                                                    <hr></hr>
                                                </div> </> : <></>
                                                }
                                                {
                                                    Object.keys(isLogin).length !== 0 ?
                                                    <><Link to="/Link" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-area-green hover:text-white">
                                                    Area
                                                </Link>
                                                <div className="py-2">
                                                    <hr></hr>
                                                </div> </> : <></>
                                                }
                                                {
                                                    Object.keys(isLogin).length !== 0 ?
                                                    <form className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-area-green hover:text-white" onSubmit={(e) => {e.preventDefault(); logoutAcccount()}}>
                                                        <i className="fas fa-sign-out-alt mr-3"></i>
                                                        <button type='submit'>
                                                            Logout
                                                        </button> 
                                                    </form> 
                                                        :
                                                        <Link to="/" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-area-green hover:text-white">
                                                            Login
                                                        </Link>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigationbar