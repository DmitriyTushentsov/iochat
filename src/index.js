import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import io from 'socket.io-client';

const socket = io("http://localhost:3232");
store.getSocket(socket);

let state = store.getState();
let dispatch = store.dispatch.bind(store);


// Socket handlers:
socket.on('userExists', function (data) {
    dispatch({type: "LOGIN_ERROR", error: data});
});
socket.on('userSet', function (data) {
    dispatch({type: "ADD_USER", userName: data.userName, id: data.id});
});
socket.on('joinRoom', function (data) {
    dispatch({type: "JOIN_ROOM", roomName: data.roomName});
});
socket.on('rooms', function (rooms) {
    dispatch({type: "GET_ROOMS_RESPONSE", rooms: rooms});
});
socket.on('message', function (messageObj) {
    dispatch({type: "ADD_MESSAGE_TO_ROOM", data: messageObj});
});

socket.on('isRoomExists', function (bool) {
    dispatch({type: "IS_ROOM_EXIST_RESPONSE", data: bool});
});

socket.on('users', function (data) {
    dispatch({type: "UPDATE_USERS_IN_GLOBAL_ROOM", users: data.users, room: data.room});
});

socket.on('userJoinRoom', function (obj) {
    dispatch({type: "UPDATE_GLOBAL_GROUP", user: obj.user, room: obj.roomName});
});

const renderPage = () => {
    ReactDOM.render(<App state={state} dispatch={dispatch} socket={socket}/>, document.getElementById('root'));
};

store.subscribe(renderPage);

renderPage();

serviceWorker.unregister();
