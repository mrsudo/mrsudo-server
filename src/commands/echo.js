module.exports = (api, _context, ...args) => {
    api.ok(args.slice(1).join(" "));
    return 0;
};
