const store = {
    state: {
        socket: null,
        activeRoomName: "Main",
        user: null,
        errors: {loginError: null, createRoom: null},
        globalRooms: [{roomName: "", usersName: ["Andrey", "Kolya"]}],
        rooms: [{
            id: 1,
            name: "Main",
            messages: [{
                id: 1,
                user: "Dimon",
                date: "11-15",
                text: "<NavLink to='http://mail.ru'>http://mail.ru</NavLink>"
            }]
        },
        ]
    },

    dispatch(action) {
        switch (action.type) {
            case "ADD_USER" :
                this._addUser(action.userName, action.id);
                break;
            case "ADD_ROOM" :
                this._addRoom(action.roomName);
                break;
            case "JOIN_ROOM" :
                this._joinRoom(action.roomName);
                break;
            case "SEND_MESSAGE" :
                this._sendMessage(action.roomName, action.text);
                break;
            case "SET_ACTIVE_ROOM" :
                this._setActiveRoom(action.roomName);
                break;
            // case "LOGOUT" :
            //     this._logout();
            //     break;
            case "VERIFY_USER" :
                this._verifyUser(action.userName);
                break;
            case "LOGIN_ERROR" :
                this._loginError(action.error);
                break;
            case "JOIN_REQUEST" :
                this._joinRequest(action.roomName);
                break;
            case "GET_ROOMS_RESPONSE" :
                this._getRoomsRes(action.rooms);
                break;

            case "ADD_MESSAGE_TO_ROOM" :
                this._addMessageToRoom(action.data);
                break;
            // case "IS_ROOM_EXIST_REQUEST" :
            //     this._isRoomExistsReq(action.roomName);
            //     break;
            // case "IS_ROOM_EXIST_RESPONSE" :
            //     this._isRoomExistsRes(action.data);
            //     break;
            case "UPDATE_USERS_IN_GLOBAL_ROOM" :
                this._updateUsersInGlobalRoom(action.users, action.room);
                break;
            case "UPDATE_GLOBAL_GROUP" :
                this._updateGlobalGroup(action.user, action.room);
                break;
            default:
                break;
        }
    },
    _refresh() {
    },

    _updateGlobalGroup(user, roomName) {
        let roomElem = this.state.globalRooms.find(item => item.roomName === roomName);
        if (roomElem === undefined) {
            this.state.globalRooms.push({roomName: roomName, usersName: [user]});
        } else {
            roomElem.usersName.push(user);
        }
        this._refresh();
    },

    _updateUsersInGlobalRoom(users, room) {
        let roomObj = {roomName: room, usersName: users};
        let roomElem = this.state.globalRooms.find(item => item.roomName === room);
        if (roomElem === undefined) {
            this.state.globalRooms.push(roomObj);
        } else {
            roomElem.usersName = users;
        }
        this._refresh();
    },

    getSocket(socket) {
        this.state.socket = socket;
    },

    getState() {
        return this.state;
    },

    _getRoomsRes(rooms) {
        for (let key in rooms) {
            this.state.globalRooms.push({roomName: key, usersName: []});
        }
    },
    // _getRoomsReq () {
    //     this.state.socket.emit('getRooms');
    // },
    subscribe(func) {
        this._refresh = func;
    },
    // _isRoomExistsRes (bool) {
    //
    //
    // },

    // _isRoomExistsReq (roomName) {
    //     this.state.socket.emit('isRoomExists', roomName);
    //
    //
    // },

    _addUser(userName, id) {
        this.state.user = {id: id, name: userName, inRooms: [{id: 1, name: "Main"}]};
        this._joinRequest("Main");
        this.state.socket.emit('getRooms');
        this._refresh();
    },

    _joinRequest(roomName) {
        let user = this.state.user.name;
        this.state.socket.emit('joinRoom', {roomName, user});
    },

    _verifyUser(userName) {
        this.state.socket.emit('setUsername', userName);
    },

    _loginError(error) {
        this.state.errors.loginError = error;
        this._refresh();
    },

    _addRoom(roomName) {
        let nextId = this.state.rooms.length;
        let roomObj = {
            id: ++nextId,
            name: roomName,
            messages: []
        };
        this.state.rooms.push(roomObj);
        this._joinRequest(roomName);
        this._refresh();
    },

    _joinRoom(roomName) {
        let nextId = this.state.user.inRooms.length;
        this.state.user.inRooms.push({id: ++nextId, name: roomName});
        this.state.socket.emit('usersInRoom', roomName);
        this._refresh();
    },

    _addMessageToRoom(messageObj) {
        let roomElem = this.state.rooms.find(item => item.name === messageObj.room);
        let messageId = roomElem.messages.length;
        let message = {id: ++messageId, user: messageObj.user, date: this._getTime(), text: messageObj.text};
        roomElem.messages.push(message);
        this._refresh();
    },

    _sendMessage(roomName, text) {
        let user = this.state.user.name;
        let messageObj = {
            room: roomName,
            user: user,
            text: text
        };
        this.state.socket.emit('message', messageObj);
    },
    //
    // _logout() {
    //     this.state.activeRoomId = 1;
    //     this.state.user = null;
    //     this.state.rooms = [{
    //         id: 1,
    //         name: "Main",
    //         messages: []
    //     }];
    //     this._refresh();
    // },

    _setActiveRoom(roomName) {
        this.state.activeRoomName = roomName;
    },

    _getTime() {
        let currentDate = new Date();
        return `${currentDate.getHours()}:${("0" + currentDate.getMinutes()).slice(-2)}`
    }
};

export default store;