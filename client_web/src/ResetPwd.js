import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { resetPassword } from './Request'


const ResetPwd = () => {
    const [name, setName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        resetPassword(name)
    }

    return(
        <div className="flex  min-h-screen">
            <div className="flex-grow w-16"></div>
                <div className="w-80 mt-40">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-md font-light mb-2" htmlFor="username">Email</label>
                            <input className="w-full h-4 bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" id="49" placeholder="Email" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-between mb-5">
                            <button className={ `${ name !== "" ? 'bg-area-green hover:bg-area-greenDeeper text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline' : 'bg-gray-200 cursor-not-allowed text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline'}`} type="submit">
                                RESET
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-md font-light">Already have an account? <Link to="/Home" className="font-light text-md text-area-green hover:text-area-greenDeeper">Login</Link></p>
                </div>
            <div className="flex-grow w-16"></div>
        </div>
    )
}

export default ResetPwd