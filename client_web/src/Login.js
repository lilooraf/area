import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginAccount } from './Request'


const Login = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        loginAccount(name, password, setError)
    }

    return(
        <div className="flex  min-h-screen">
            <div className="flex-grow w-16"></div>
                <div className="w-80 mt-40">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-md font-light mb-2" htmlFor="username">Email</label>
                            <input className={`w-full h-4 bg-drabya-gray ${ error.length !== 0 ? 'border-red-500' : 'border-gray-500'} appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline`} type="text" name="Email" id="49" placeholder="Email" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-md font-light mb-2" htmlFor="password">Password</label>
                            <input className={`w-full h-4 bg-drabya-gray ${ error.length !== 0 ? 'border-red-500' : 'border-gray-500'} appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline`} type="password" name="password" id="456" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex items-center justify-between mb-5">
                            <button className={`${name !== "" && password !== "" ? 'bg-area-green hover:bg-area-greenDeeper text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline' : 'bg-gray-200 cursor-not-allowed text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline'}`} type="submit">
                                LOGIN
                            </button>
                            {error}
                            <Link to="/ResetPwd" className="inline-block align-baseline font-light text-sm text-area-green hover:text-area-greenDeeper">
                                Forgot Password?
                            </Link>
                        </div>
                        <p className="text-center text-md font-light">Don't have an account? <Link to="/CreateAccount" className="font-light text-md text-area-green hover:text-area-greenDeeper">Create</Link></p>
                    </form>
                </div>
            <div className="flex-grow w-16"></div>
        </div>
    )
}

export default Login