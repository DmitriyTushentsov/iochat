import React from 'react';
import s from './header.module.css'

const Header = (props) => {

    return (
        <div className={s.header}>
            <h1>Chat</h1>
        </div>
    );
};

export default Header;