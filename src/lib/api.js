module.exports = (socket) => ({
    stdout(msg) {
        socket.emit('stdout', msg);
    },
    stderr(msg) {
        socket.emit('stderr', msg);
    }
});
