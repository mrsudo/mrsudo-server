// const app      = require("express")();
// const http     = require('http').Server(app);
const io       = require('socket.io')(3000);

const commands   = require('./commands');
const apiFactory = require('./lib/api');

//
io.on('connection', (socket) => {
    console.log('Connected');
    let api = apiFactory(socket);

    // TODO

    socket.on('execute', (data) => {
        console.log(`Executing: ${data.command}`);
        let args = data.command.split(" ");

        if (args[0] in commands) {
            if (typeof commands[args[0]] === 'function') {
                commands[args[0]].apply(
                    commands[args[0]],
                    [api].concat(args)
                );
            } else {
                api.stderr('Internal error');
            }
        } else {
            api.stderr('Not a valid command');
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
