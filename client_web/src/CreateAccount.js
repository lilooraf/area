import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createAccount } from './Request'
import { CheckUsername } from './utils'

const CreateAccount = () => {
    const [name, setName] = useState("")
    const [confName, setconfName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (CheckUsername(password, confName) && password.length >= 6) {
            setError("")
            createAccount(name, password)
        } else if (password.length < 6 && CheckUsername(password, confName)) {
            setError(
                <div className=" text-xs text-red-500">
                    Password must be at least 6 characters
                </div>
            )
        } else {
            setError(
                <div className=" text-xs text-red-500">
                    Verify password or username
                </div>
            )
        }
    }

    return(
        <div className="flex  min-h-screen">
            <div className="flex-grow w-16"></div>
                <div className="w-80 mt-40">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-md font-light mb-2" htmlFor="username">Email</label>
                            <input className="w-80 h-4 bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="Email" id="45" placeholder="Email" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-md font-light mb-2" htmlFor="username">Password</label>
                            <input className={`w-80 h-4 bg-drabya-gray ${ error.length !== 0 ? 'border-red-500' : 'border-gray-500'} appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline`} type="password" name="username" id="47" placeholder="Password" onChange={(e) => setconfName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-md font-light mb-2" htmlFor="password">Confirm Password</label>
                            <input className={`w-80 h-4 bg-drabya-gray ${ error.length !== 0 ? 'border-red-500' : 'border-gray-500'} appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline`} type="password" name="password" id="67" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex items-center justify-between mb-5">
                            <button className={`${ name !== "" && confName !== "" && password !== "" ? 'bg-area-green hover:bg-area-greenDeeper text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline' : 'bg-gray-200 cursor-not-allowed text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline'}`} type="submit">
                                CREATE
                            </button>
                            {error}
                        </div>
                        <p className="text-center text-md font-light">Already have an account? <Link to="/Home" className="font-light text-md text-area-green hover:text-area-greenDeeper">Login</Link></p>
                    </form>
                </div>
            <div className="flex-grow w-16"></div>
        </div>
    )
}

export default CreateAccount