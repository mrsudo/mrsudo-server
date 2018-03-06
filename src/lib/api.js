module.exports = (socket) => ({
    ok(msg) {
        socket.emit('stdout', msg);
    },

    err(msg) {
        socket.emit('stderr', msg);
    }
});
