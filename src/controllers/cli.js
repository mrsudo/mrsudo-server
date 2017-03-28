// const CommandModel = require('../models/command');

module.exports = {
    execute(req, res, next) {
        // let command = req.body.command;

        // let meta = CommandModel.parse(command);
        res.send("Hello world");
    }
};
