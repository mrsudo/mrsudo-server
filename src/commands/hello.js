module.exports = (args, socket) => {
    let name = "world";
    if (args.length > 1) {
        name = args[1];
    }
    socket.emit('stdout', `Hello, ${name}!`);
    return 0;
};
