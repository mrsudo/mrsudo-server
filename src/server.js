// const app  = require("express")();
// const http = require('http').Server(app);
const io   = require('socket.io')(3000);

io.on('connection', (socket) => {
    console.log('Connected');

    // TODO

    socket.on('execute', (data) => {
        console.log(`Executing: ${data.command}`);
        let args = data.command.split(" ");
        if (args[0] == "hello") {
            require('./commands/hello')(args, socket);
        } else {
            socket.emit('stdout', 'Not a valid command');
        }
    });

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});

// TODO
// app.get('/', (req, res) => {
//     res.send('Nothing here!');
// });

// app.listen(3000, () => {
//     console.log('Listening on port 3000');
// });
