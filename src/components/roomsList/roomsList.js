import React from 'react';
import s from './roomsList.module.css'
import {NavLink} from "react-router-dom";


const RoomsList = (props) => {
    let mappedRooms = props.state.rooms.map(item =>
        <li className={s.element} key={item.id}>
            <NavLink to={`/rooms/${item.name.toLowerCase()}`} activeClassName={s.active}>{item.name}</NavLink>
        </li>
    );

    let addRoom = function () {
        let room = prompt("Enter room name", "");
        if (!room) return null;
        let roomName = room.charAt(0).toUpperCase() + room.slice(1).toLowerCase(); //change name of the room to format "Xxxxxxxx"
        if (props.state.globalRooms.find(item => item.roomName === roomName) !== undefined) {
            alert("This room already exist!");
        } else {
            props.dispatch({type: "ADD_ROOM", roomName: roomName});
        }
    };

    return (
        <div className={s.rooms}>
            <li className={s.element}>
                <button onClick={addRoom}>Add room</button>
            </li>
            <li className={s.caption}><h2>Select room:</h2></li>
            {mappedRooms}
        </div>
    );
};

export default RoomsList;