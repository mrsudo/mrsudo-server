module.exports = {
    db:       'mongodb://mongodb/demodb',
    rootPath: require('path').normalize(__dirname + '/../../'),
    port:     process.env.PORT || 3030
};
