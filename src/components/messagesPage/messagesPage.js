import React from 'react';
import s from './messagesPage.module.css'
import {NavLink} from "react-router-dom";

const getRelativePath = (fullPath) => {
    return fullPath.replace(document.location.origin, "");
};

const MessagesPage = (props) => {
    props.dispatch({type: "SET_ACTIVE_ROOM", roomName: props.roomName});
    let activeChatElem = props.state.rooms.find(item => item.name === props.state.activeRoomName);

    let mappedMessages = activeChatElem.messages.map(item => <div className={s.message} key={item.id}>
        <span className={s.date}>{item.date}</span>
        <span className={s.user}>{item.user}</span> :
        {/*handle text message: divide it into words and if word starts with http add link to it.*/}
        <span className={s.text}>
            {item
                .text
                .split(" ")
                .map(word => word.indexOf("http") === 0 ?
                    <NavLink to={getRelativePath(word)}>{word}</NavLink> :
                    word)
                .map(tag => {
                    return <><span> </span> {tag}</>
                })
            }</span>
    </div>);

    let messageInput = React.createRef();

    let addMessage = (e) => {
        e.preventDefault();
        let text = messageInput.current.value;
        if (text) props.dispatch({type: "SEND_MESSAGE", roomName: activeChatElem.name, text: text});
        messageInput.current.value = '';
    };

    return (
        <div className={s.messages}>
            {mappedMessages}
            <div className={s.inputForm}>
                <form action="" onSubmit={addMessage}>
                    <textarea name="inputField" id="" rows="3" ref={messageInput}></textarea>
                    <input type="submit"/>
                </form>
            </div>
        </div>
    );
};

export default MessagesPage;