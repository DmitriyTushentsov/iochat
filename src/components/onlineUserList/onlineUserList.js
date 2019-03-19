import React from 'react';
import s from './onlineUserList.module.css'

const OnlineUserList = (props) => {
    let activeChatElem = props.state.globalRooms.find(item => item.roomName === props.state.activeRoomName);
    let mappedUsers = activeChatElem ? activeChatElem.usersName.map(item => <li>{item}</li>) : false;

    return (
        <div className={s.users}>
            <li className={s.caption}>
                <h2>Users online:</h2>
            </li>
            {mappedUsers}
        </div>
    );
};

export default OnlineUserList;