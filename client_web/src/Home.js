import React from 'react'

const Home = () => {

    return(
        <div className="grid auto-rows-auto ">
            <div className="flex bg-zappier-ft">
                <div className="grid grid-cols-3 grid-rows-2 gap-4 ml-11">
                    <h1 className="font-bold text-6xl mt-14">
                        Connect your apps and automate workflows
                    </h1>
                    <h1 className=" row-start-2 text-2xl text-gray-500">
                        Easy automation for busy people. Area moves info between your web apps automatically, so you can focus on your most important work.
                    </h1>
                </div>
            </div>
            <section className="mb-12">
                <p className="flex col-span-5 justify-center mt-12 font-bold text-gray-600">
                    TRUSTED AT COMPANIES LARGE AND SMALL
                </p>
                <ul className="flex justify-center">
                    <li>
                        <img src="./epitech.svg" className=" w-28" alt="epitech"></img>
                    </li>
                    <li>
                        <img src="./appiness.svg" className=" w-28 ml-28" alt="epitech"></img>
                    </li>
                </ul>
            </section>
            <section>
                <ul className="grid grid-cols-16 gap-6 justify-center">
                    <li>
                        <div className=" border border-gray-300 rounded-2xl">
                            <article className="p-14">
                                <div className="grid grid-cols-13 justify-center">
                                    <span className=" mt-4 flex justify-center border rounded-xl border-gray-200">
                                        <img src="./youtube.png" className=" w-11" alt="youtube" />
                                    </span>
                                    <img src="./lines.svg" alt="line" className=" mt-8"/>
                                </div>
                                <div>
                                    <h2 className=" flex justify-center font-bold text-2xl mt-3">
                                        Integrate
                                    </h2>
                                    <p className=" text-center text-gray-500 text-l">
                                        Link your web apps with a few clicks, so they can share data
                                    </p>
                                </div>
                            </article>
                        </div>
                    </li>
                    <li>
                        <div className=" border border-gray-300 flex justify-center rounded-2xl">
                        <article className="p-14">
                            <div className="grid grid-cols-14 justify-center">
                                <span className=" mt-4 flex justify-center border rounded-xl border-gray-200">
                                    <img src="./youtube.png" className=" w-11" alt="youtube" />
                                </span>
                                <img src="./line2.svg" alt="line2" className=" mt-8"/>
                                <span className=" mt-4 flex justify-center border rounded-xl border-gray-200">
                                    <img src="./spotify.png" className=" w-11" alt="spotify" />
                                </span>
                                <img src="./lines.svg" alt="lines" className=" mt-8"/>
                            </div>
                            <div>
                                <h2 className=" flex justify-center font-bold text-2xl mt-3">
                                    Automate
                                </h2>
                                <p className=" text-center text-gray-500 text-l">
                                    Pass info between your apps with workflows called Areas
                                </p>
                            </div>
                        </article>
                        </div>
                    </li>
                    <li>
                        <div className=" border border-gray-300 flex justify-center rounded-2xl">
                        <article className="p-14">
                            <div className="grid grid-cols-15 justify-center">
                                <span className=" mt-4 flex justify-center border rounded-xl border-gray-200">
                                    <img src="./youtube.png" className=" w-11" alt="youtube" />
                                </span>
                                <img src="./line2.svg" alt="line2" className=" mt-8"/>
                                <span className=" mt-4 flex justify-center border rounded-xl border-gray-200">
                                    <img src="./spotify.png" className=" w-11" alt="spotify" />
                                </span>
                                <img src="./line2.svg" alt="lines" className=" mt-8"/>
                                <span className=" mt-4 flex justify-center border rounded-xl border-gray-200">
                                    <img src="./area.png" className=" w-11" alt="area" />
                                </span>
                            </div>
                            <div>
                                <h2 className=" flex justify-center font-bold text-2xl mt-3">
                                    Innovate
                                </h2>
                                <p className=" text-center text-gray-500 text-l">
                                    Build processes faster and get more done—no code required
                                </p>
                            </div>
                        </article>
                        </div>
                    </li>
                </ul>
            </section>
            <div className=" pb-20"></div>
        </div>
    )
}

export default Home