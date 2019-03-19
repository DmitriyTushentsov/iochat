import React from 'react';
import './App.css';
import RoomsList from './components/roomsList/roomsList.js';
import OnlineUserList from './components/onlineUserList/onlineUserList.js';
import Header from './components/header/header.js';
import LoginPage from './components/loginPage/loginPage.js';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import ChatRoute from './components/chatRoute/chatRoute.js';

const App = (props) => {

    if (!props.state.user) return <LoginPage state={props.state} dispatch={props.dispatch}/>; //if user was already set - run application, else display login form

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <RoomsList state={props.state}
                           dispatch={props.dispatch}
                           socket={props.socket}/>
                <Route exact path="/rooms/:name"
                       render={({match}) => <ChatRoute name={match.params.name}
                                                       dispatch={props.dispatch}
                                                       state={props.state}/>}/>
                <OnlineUserList state={props.state} socket={props.socket}/>
            </div>
        </BrowserRouter>
    );
};

export default App;

