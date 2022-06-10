import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React, { useContext } from 'react'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import Navigationbar from './Navbar'
import CreateAccount from './CreateAccount';
import Routine from './Routine';
import ResetPwd from './ResetPwd';
import { AuthContext } from './context/AuthContext';
import SpotifyContextProvider from './context/services/SpotifyContext';
import CalendarContextProvider from './context/services/CalendarContext';
import IntranetContextProvider from './context/services/IntranetContext';
import MicrosoftContextProvider from './context/services/MicrosoftContext';
import MoviedbContextProvider from './context/services/MoviedbContext';
import OneNoteContextProvider from './context/services/OneNoteContext';
import YoutubeContextProvider from './context/services/YoutubeContext';
import { Footer } from './Footer';
import { Links } from './Links';

function App() {
    const {isLogin} = useContext(AuthContext)

    return (
    <BrowserRouter>
        <Navigationbar />
        <div>
        {
        Object.keys(isLogin).length !== 0 ?
        <SpotifyContextProvider>
            <CalendarContextProvider>
            <IntranetContextProvider>
                <MicrosoftContextProvider>
                <MoviedbContextProvider>
                    <OneNoteContextProvider>
                    <YoutubeContextProvider>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/Home" component={Home} />
                            <Route path="/Profile" component={Profile} />
                            <Route path="/CreateAccount" component={CreateAccount} />
                            <Route path="/Routines" component={Routine} />
                            <Route path="/ResetPwd" component={ResetPwd} />
                            <Route path="/Link" component={Links} />
                        </Switch>
                    </YoutubeContextProvider>
                    </OneNoteContextProvider>
                </MoviedbContextProvider>
                </MicrosoftContextProvider>
            </IntranetContextProvider>
            </CalendarContextProvider>
        </SpotifyContextProvider>
        :
        <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/Home" component={Login} />
                <Route path="/Profile" component={Login} />
                <Route path="/CreateAccount" component={CreateAccount} />
                <Route path="/Routines" component={Login} />
                <Route path="/ResetPwd" component={ResetPwd} />
                <Route path="/Link" component={Login} />
            </Switch>
        }
        </div>
        <Footer />
    </BrowserRouter>
    );
}

export default App;