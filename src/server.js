const app  = require("express")();
const http = require('http').Server(app);
const io   = require('socket-io')(http);

app.get('/', (req, res) => {
    res.send('Nothing here!');
});

io.on('connection', (socket) => {
    console.log('Connected');

    // TODO

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
