import './index.css';
import React, {useContext} from 'react';
import ReactRoundedImage from "react-rounded-image";
import Img from './images/Diamond.png'
import SwitchMode from './Switch';
import { deleteAccount} from './Request';
import {Modals} from './Modal'
import { SpotifyContext } from './context/services/SpotifyContext';
import { CalendarContext } from './context/services/CalendarContext';
import { IntranetContext } from './context/services/IntranetContext';
import { MicrosoftContext } from './context/services/MicrosoftContext';
import { MoviedbContext } from './context/services/MoviedbContext';
import { OneNoteContext } from './context/services/OneNoteContext';
import { YoutubeContext } from './context/services/YoutubeContext';



const Profile = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        deleteAccount()
    }
    const { CalendarInfos, setCalendarSwitch } = useContext(CalendarContext);
    const { IntranetInfos, setIntranetSwitch } = useContext(IntranetContext);
    const { MicrosoftInfos, setIsModalOpenMicrosoft } = useContext(MicrosoftContext);
    const { MoviedbInfos, setMoviedbSwitch } = useContext(MoviedbContext);
    const { OneNoteInfos, setOneNoteSwitch } = useContext(OneNoteContext);
    const { SpotifyInfos, setIsModalOpenSpotify } = useContext(SpotifyContext);
    const { YoutubeInfos, setIsModalOpenYoutube } = useContext(YoutubeContext);

    return(
        <div className=" min-h-screen">
            <div className="flex">
                <Modals />
                <div className="flex-grow w-16"></div>
                    <div className=" w-80 flex-shrink">
                        <div className='image-position'>
                            <ReactRoundedImage image={Img} roundedSize="0" imageWidth="150" imageHeight="150" />
                        </div>
                        <div className=' flex justify-center shadow-2xl rounded-2xl m-2'>
                            <div className='flex flex-col m-2 space-y-5'>
                                <SwitchMode text="Youtube" modal={setIsModalOpenYoutube} state={YoutubeInfos !== undefined && Object.keys(YoutubeInfos).length !== 0 && YoutubeInfos.data.document.status} collection={'Youtube'}/>
                                <SwitchMode text="Movie DB" modal={setMoviedbSwitch} state={MoviedbInfos !== undefined && Object.keys(MoviedbInfos).length !== 0 && MoviedbInfos.data.document.status} collection={'Moviedb'}/>
                                <SwitchMode text="Microsoft" modal={setIsModalOpenMicrosoft} state={MicrosoftInfos !== undefined && Object.keys(MicrosoftInfos).length !== 0 && MicrosoftInfos.data.document.status} collection={'Microsoft'}/>
                                <SwitchMode text="Spotify" modal={setIsModalOpenSpotify} state={SpotifyInfos !== undefined && Object.keys(SpotifyInfos).length !== 0 && SpotifyInfos.data.document.status} collection={'Spotify'}/>
                                <SwitchMode text="One Note" modal={setOneNoteSwitch} state={OneNoteInfos !== undefined && Object.keys(OneNoteInfos).length !== 0 && OneNoteInfos.data.document.status} collection={'OneNote'}/>
                                <SwitchMode text="Intranet" modal={setIntranetSwitch} state={IntranetInfos !== undefined && Object.keys(IntranetInfos).length !== 0 && IntranetInfos.data.document.status} collection={'Intranet'}/>
                                <SwitchMode text="Calendar" modal={setCalendarSwitch} state={CalendarInfos !== undefined && Object.keys(CalendarInfos).length !== 0 && CalendarInfos.data.document.status} collection={'Calendar'}/>
                            </div>
                        </div>
                    </div>
                <div className="flex-grow w-16"></div>
            </div>
            <div className=" flex justify-center mt-14">
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-5">
                        <button className="bg-red-700 hover:bg-red-800 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
                            DELETE ACCOUNT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile