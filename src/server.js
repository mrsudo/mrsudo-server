const app    = require("express")();
const server = require('http').createServer(app);
const io     = require('socket.io')(server);

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
app.get('/', (req, res) => {
    res.send('Nothing here!');
});

server.listen(3000);
