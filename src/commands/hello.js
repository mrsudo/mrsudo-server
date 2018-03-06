module.exports = (api, _context, ...args) => {
    let name = "world";
    if (args.length > 1) {
        name = args.slice(1).join(" ");
    }
    api.ok(`Hello, ${name}!`);
    return 0;
};
