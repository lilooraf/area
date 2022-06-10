import React, {useContext, useState} from 'react'
import Modal from 'react-modal';
import { createUserService, updateUserServiceStatus } from './Request';
import MicrosoftLogin from "react-microsoft-login";
import SpotifyLogin from 'react-spotify-login'
import { SpotifyContext } from './context/services/SpotifyContext';
import { MicrosoftContext } from './context/services/MicrosoftContext';
import { IntranetContext } from './context/services/IntranetContext';
import { motion } from 'framer-motion';

const varriantModalContent = {
    initial: {
        y: -200,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6
        }
    }
};

Modal.setAppElement('#root');

export const Modals = () => {

    const { MicrosoftInfos, isModalOpenMicrosoft,setIsModalOpenMicrosoft } = useContext(MicrosoftContext);
    const { SpotifyInfos, isModalOpenSpotify, setIsModalOpenSpotify } = useContext(SpotifyContext);
    const { IntranetInfos, isIntraSwitched, setIntranetSwitch } = useContext(IntranetContext);
    const [ autologin, setAutologin ] = useState('');
    const [ animate, setAnimate ] = useState(false);

    const SpotifyLog = (data) => {
        console.log(data)
        createUserService({data: { access_token: data.access_token }, collection: 'Spotify'});
        setIsModalOpenSpotify(false)
    }

    const stockInfo = (e, data) => {
        console.log("error ==> ", e)
        console.log("valuez", data)
        createUserService({data: { access_token: data.accessToken }, collection: 'Microsoft'});
        setIsModalOpenMicrosoft(false)
    }

    const handleIntra = (e) => {
        e.preventDefault();
        console.log(autologin);
        updateUserServiceStatus({data: { access_token: autologin }, collection: 'Intranet'});
        setAutologin('');
        setIntranetSwitch(false);
    }

    console.log("client ID ==> ", process.env.REACT_APP_MICROSOFT_ID)
    return (
        <div>
            { SpotifyInfos !== undefined && Object.keys(SpotifyInfos).length !== 0 && SpotifyInfos.data.document.access_token === "empty" && 
                <div className="relative">
                    <Modal
                        isOpen={isModalOpenSpotify}
                        onRequestClose={() => {setIsModalOpenSpotify(false); setAnimate(false);}}
                        onAfterOpen={ () => setAnimate(true) }
                        className="absolute inset-0 flex items-center justify-center border-0 bg-opacity-60 bg-area-901"
                        contentLabel="Example Modal">
                        <motion.div className="flex flex-col justify-center pb-10 space-y-4 bg-white rounded-lg w-96 h-96" variants={varriantModalContent} initial="initial" animate={(animate) ? "animate" : ""}>
                            <div className="flex justify-center">
                                <img className="w-48 responsive-img" alt="spotify" src="./spotify.png" />
                            </div>
                            <div className="flex justify-center">                                                
                                <SpotifyLogin className="h-10 text-xl text-white bg-area-50 rounded-xl w-44" clientId={process.env.REACT_APP_SPOTIFY_ID} redirectUri='http://localhost:8081/callback' buttonText="Spotify" onSuccess={SpotifyLog} />
                            </div>
                            <div className="flex justify-center">
                                <button onClick={() => setIsModalOpenMicrosoft(false)} className="p-2 px-8 font-bold text-white rounded-2xl bg-area-601">Annuler</button>
                            </div>
                        </motion.div>
                    </Modal>
                </div>
            
            }
            
            { MicrosoftInfos !== undefined && Object.keys(MicrosoftInfos).length !== 0 && MicrosoftInfos.data.document.access_token === "empty" && 
                <div className="relative">
                    <Modal
                        isOpen={isModalOpenMicrosoft}
                        onRequestClose={() => { setIsModalOpenMicrosoft(false); setAnimate(false);}}
                        onAfterOpen={ () => setAnimate(true) }
                        className="absolute inset-0 flex items-center justify-center border-0 bg-opacity-60 bg-area-901"
                        contentLabel="Example Modal">
                        <motion.div className="flex flex-col justify-center pb-10 space-y-4 bg-white rounded-lg w-96 h-96" variants={varriantModalContent} initial="initial" animate={(animate) ? "animate" : ""}>
                            <div className="flex justify-center">
                                <img className=" responsive-img w-72" alt="microsoft" src="./Microsoft.png" />
                            </div>
                            <div className="flex justify-center">
                                <MicrosoftLogin clientId='a8013030-a458-4b90-b0c6-aa517934d562' authCallback={stockInfo} />
                            </div>
                            <div className="flex justify-center">
                                <button onClick={() => setIsModalOpenMicrosoft(false)} className="p-2 px-8 font-bold text-white rounded-2xl bg-area-601">Annuler</button>
                            </div>
                        </motion.div>
                    </Modal> 
                </div>
            }

            { IntranetInfos !== undefined && Object.keys(IntranetInfos).length !== 0 && IntranetInfos.data.document.access_token === "empty" && 
                <div className="relative">
                    <Modal
                        isOpen={isIntraSwitched}
                        onRequestClose={() => { setIntranetSwitch(false); setAnimate(false);}}
                        onAfterOpen={ () => setAnimate(true) }
                        className="absolute inset-0 flex items-center justify-center border-0 bg-opacity-60 bg-area-901"
                        contentLabel="Example Modal"
                    >
                    <motion.div variants={varriantModalContent} initial="initial" animate={(animate) ? "animate" : ""}>
                        <form onSubmit={handleIntra} className="flex m-4">
                            <input value={autologin} onChange={(e) => setAutologin(e.target.value)} className="p-4 mr-0 text-gray-800 bg-white border-t border-b border-l border-gray-200 rounded-l-lg" placeholder="autologin"/>
                            <button className="p-4 px-8 font-bold text-white uppercase border-t border-b border-r rounded-r-lg border-area-201 bg-area-101">envoyer</button>
                        </form>
                    </motion.div>
                    </Modal> 
                </div>
            }
        </div>
    )
}
