module.exports = (socket) => ({
    ok(msg) {
        socket.emit('ok', msg);
    },

    err(msg) {
        socket.emit('error', msg);
    },

    data(data) {
        socket.emit('data', data);
    }
});
