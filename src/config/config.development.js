module.exports = {
    db:       'mongodb://docker.dev/demodb',
    rootPath: require('path').normalize(__dirname + '/../../'),
    port:     process.env.PORT || 3030
};
