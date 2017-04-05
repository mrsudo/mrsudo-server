module.exports = (api, ...args) => {
    api.stdout(args.slice(1).join(" "));
    return 0;
};
