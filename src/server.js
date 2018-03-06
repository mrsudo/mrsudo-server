console.log("Starting...");

process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

//
const io = require('socket.io')(3000);

const commands    = require('commands');
const apiFactory  = require('lib/api');
const version = require('version');

//
let connected_users = [];

io.use((socket, next) => {
    console.log(`Query: ${socket.handshake.query.ssid}`);
    // TODO Replace with real authentication
    if (socket.handshake.query.ssid === "0") {
        return next();
    }
    next(new Error('Authentication error'));
});

//
io.on('connect', (socket) => {
    let ssid = parseInt(socket.handshake.query.ssid);
    let api = apiFactory(socket);

    console.log(`New connection from ${socket.handshake.address} (${ssid})`);

    // TODO construct session context (user info) from ssid
    let context = {};
    // if ssid is valid {
    //     fill context with session data
    //     2. send sessionid back to user to be stored in a cookie
    // }

    // TODO Integration into context
    connected_users.push(ssid);
    console.log(`Users logged in: ${connected_users}`);

    socket.on('disconnect', () => {
        console.log(`Disconnected ${socket.handshake.address}`);
        //
        let i = connected_users.indexOf(ssid);
        if (i > -1) connected_users.splice(i, 1);
        console.log(`Users left: ${connected_users}`);
    });

    socket.on('execute', data => {
        // TODO Error-check data
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

console.log(`Mr. Sudo v${version} started`);
