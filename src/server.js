console.log("Starting...");

process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

//
require('lib/util');
const apiFactory = require('lib/api');
const commands = require('commands');

const io = require('socket.io')(3000);

//
let connected_users = [];


// TODO Replace with real authentication
io.use((socket, next) => {
    console.log(`Query: ${socket.handshake.query.ssid}`);
    if (socket.handshake.query.ssid === "0") {
        return next();
    }
    next(new Error('Authentication error'));
});

//
io.on('connect', (socket) => {
    const api = apiFactory(socket);

    let ssid = socket.handshake.query.ssid;
    connected_users.push(ssid);

    console.log("New connection from %s (%d active)",
                socket.handshake.address,
                connected_users.length);

    // TODO construct session context (user info) from ssid
    // TODO store user session data in redis
    let context = {};

    socket.on('disconnect', () => {
        console.log("Disconnected %s (%s left)",
                    socket.handshake.address,
                    connected_users.remove(ssid).length);
    });

    // TODO Error-check data
    socket.on('execute', data => {
        console.log(`Executing: ${data.command}`);
        let args = data.command.split(" ");
        if (args[0] in commands) {
            // dispatch to a command (in commands/*.js)
            if (typeof commands[args[0]] === 'function') {
                commands[args[0]].apply(
                    commands[args[0]],
                    [api, context].concat(args)
                );
            } else {
                api.err('Internal error');
            }
        } else {
            api.err('Not a valid command');
        }
    });
});

console.log(`Mr. Sudo v${require('version')} started`);
