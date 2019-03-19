let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/public/index.html");
// });


let users = [];

io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on('setUsername', function (data) {
        if (users.find(item => item.name === data) === undefined) {
            users.push({id: socket.id, name: data});
            socket.name = data;
            socket.emit('userSet', {userName: data, id: socket.id});
        } else {
            socket.emit('userExists', data + ' username is already exists');
        }
    });

    socket.on('joinRoom', function (obj) {
        socket.join(obj.roomName);
        socket.broadcast.emit('userJoinRoom', obj);
        socket.emit('joinRoom', {roomName: obj.roomName});
    });

    socket.on('getRooms', function () {
        socket.emit('rooms', socket.adapter.rooms);
    });

    socket.on('message', function (messageObj) {
        io.sockets.in(messageObj.room).emit('message', messageObj);
    });

    socket.on('isRoomExists', function (roomName) {
        let bool = roomName in socket.adapter.rooms;
        socket.emit('isRoomExists', bool);
    });

    socket.on('usersInRoom', function (roomName) {
        io.of('/').in(roomName).clients((error, clients) => {
            if (error) throw error;
            let arr = [];
            for (let i = 0; i < users.length; i++) {
                if (clients.find(item => item === users[i].id) !== undefined) {
                    arr.push(users[i].name);
                }
                socket.emit('users', {users: arr, room: roomName});
            }
        });
    });
});

http.listen(3232, function () {
    console.log("listening on *:3232");
});