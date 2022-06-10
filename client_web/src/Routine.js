import React, { useEffect, useState } from 'react'
import { createLink, getOneService, getService } from './Request'

const Routine = () => {
    const [services, setServices] = useState([])

    const [val, setVal] = useState("")
    const [valS, setValS] = useState("")

    const [trigger, setTrigger] = useState("")
    const [action, setAction] = useState("")

    const [listAction, setListAction] = useState([])
    const [listActionN, setListActionN] = useState([])

    const [listTrigger, setListTrigger] = useState([])
    const [listTriggerN, setListTriggerN] = useState([])

    const [sendingData, setSendingData] = useState({})
    const [sendingDataB, setSendingDataB] = useState({})

    const [data, setData] = useState([])
    const [dataB, setDataB] = useState([])

    const [name, setName] = useState("")
    
    useEffect(() => {
        getService(setServices)
    }, [setServices])

    useEffect(() => {
        getOneService(val, setListTrigger)
        getOneService(valS, setListAction)
    }, [val, valS])

    const handleSubmit = (e) => {
        e.preventDefault()
        createLink(name, val, valS, trigger, action, sendingData, sendingDataB)
    }

    useEffect(() => {
        const obja = Object.keys(listTrigger)
        obja.unshift("    ")
        if (obja !== undefined) {
            setListTriggerN(obja)
        }
        getObjectData(trigger, listTrigger)
    }, [listTrigger, trigger])

    useEffect(() => {
        const obja = Object.keys(listAction)
        obja.unshift("    ")
        if (obja !== undefined) {
            setListActionN(obja)
        }
        getObjectDataB(action, listAction)
    }, [listAction, action])

    const getObjectData = (key, data) => {
        var a = data[key]

        if (a !== undefined) {
            var b = Object.keys(a)
            setData(b)
        }
    }

    const getObjectDataB = (key, data) => {
        var a = data[key]

        if (a !== undefined) {
            var b = Object.keys(a)
            setDataB(b)
        }
    }

    return(
        <div className=" flex  min-h-screen">
                <div className="flex-grow "></div>
                <form className={`border shadow-2xl rounded-lg mt-20 flex-shrink ${val !== "" && valS !== "" ? 'h-full' : ' h-60'} w-7/12`} onSubmit={handleSubmit}>
                    <div>
                        <div className="flex justify-center mt-5">
                            <span className=" sm:text-3xl font-bold">Create your own routine</span>
                        </div>
                        <p className=" flex justify-center text-gray-500 text-xl py-4">Select the apps you want to connect to start the setup.</p>
                        <div className="flex justify-center">
                            <label className="font-bold">Link Name</label>
                            <input className="border ml-4 rounded" onChange={(e) => setName(e.target.value)} type="text" ></input>
                        </div>
                        <section className="flex justify-center gap-11">
                            <div className="mt-10">
                                <h4 className="font-bold text-sm">Connect this app...</h4>
                                <div className="w-auto  flex flex-col">
                                    <div className=" bg-white flex justify-center border border-gray-200 rounded">
                                        <select value={val} onChange={(e) => setVal(e.target.value)} >
                                            {services.map((value) => {
                                                return (
                                                    <option key={value.name} value={value.name}>{value.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h4 className=" font-bold text-sm">with this one!</h4>
                                <div className="w-auto  flex flex-col">
                                    <div className=" bg-white flex justify-center border border-gray-200 rounded">
                                        <select value={valS} onChange={(e) => setValS(e.target.value)} >
                                            {services.map((value) => {
                                                return (
                                                    <option key={value.name} value={value.name}>{value.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {
                            val !== "" && valS !== "" ? 
                        <section className="flex justify-center gap-11">
                            <div className="mt-10">
                                <h4 className="font-bold text-sm">When this happens...</h4>
                                <div className="w-auto  flex flex-col">
                                    <div className=" bg-white flex justify-center border border-gray-200 rounded">
                                        <select value={trigger} onChange={(e) => setTrigger(e.target.value)} >
                                            {listTriggerN.map((value) => {
                                                if (value === "name")
                                                    return
                                                return (
                                                    <option key={value} value={value}>{value !== undefined ? value.replaceAll("_", " ") : value}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h4 className=" font-bold text-sm">then do this!</h4>
                                <div className="w-auto  flex flex-col">
                                    <div className=" bg-white flex border border-gray-200 rounded">
                                        <select value={action} onChange={(e) =>  setAction(e.target.value)} >
                                            {listActionN.map((value) => {
                                                if (value === "name")
                                                    return
                                                return (
                                                    <option key={value} value={value}>{value !== undefined ? value.replaceAll("_", " ") : value}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>
                        : <></>
                        }
                        <section>
                            <div className="flex mt-5 justify-center">
                                {data.map((value) => {
                                            return (
                                            <div>
                                                <label className="font-bold mr-4">{value}</label>
                                                <input key={value} onChange={(e) => setSendingData({...sendingData, [value]:e.target.value})
                                                } className=" mr-4 border rounded-2xl" type="text" name={value}></input>
                                            </div>
                                        )
                                    })}
                                {dataB.map((value) => {
                                        return (
                                        <div>
                                            <label className="font-bold">{value}</label>
                                            <input key={value} onChange={(e) => setSendingDataB({...sendingDataB, [value]:e.target.value})
                                            } className=" mr-4 border rounded-2xl" type="text" name={value}></input>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                        {
                            trigger !== "" && action !== "" ?
                            <div className="flex justify-center">
                                <button type="submit" className=" mt-8 mb-3 rounded bg-area-green hover:bg-area-greenDeeper px-7 py-1 text-white ">Create</button>
                            </div>
                            : ""
                        }
                    </div>
                </form>
            <div className="flex-grow"></div>
        </div>
    )
}

export default Routine