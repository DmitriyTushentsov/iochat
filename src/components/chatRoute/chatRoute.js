import React from 'react';
import MessagesPage from '../messagesPage/messagesPage.js';
import {Redirect} from 'react-router-dom';

const chatRoute = (props) => {
    let roomName = props.name.charAt(0).toUpperCase() + props.name.slice(1).toLowerCase();
    if (roomName === "Main") {
        return (
            <MessagesPage dispatch={props.dispatch} state={props.state} roomName="Main"/>
        );
    }

    if (props.state.globalRooms.find(item => item.roomName === roomName) === undefined) {
        alert("This room does not exist!");
        return (
            <Redirect to='/rooms/main'/>
        );
    }

    if (props.state.rooms.find(item => item.name === roomName) === undefined) {
        props.dispatch({type: "ADD_ROOM", roomName: roomName});
        return (
            <MessagesPage dispatch={props.dispatch} state={props.state} roomName={roomName}/>
        );
    }

    return (
        <MessagesPage dispatch={props.dispatch} state={props.state} roomName={roomName}/>
    );
};

export default chatRoute;


