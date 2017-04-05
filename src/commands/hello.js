module.exports = (api, ...args) => {
    let name = "world";
    if (args.length > 1) {
        name = args.slice(1).join(" ");
    }
    api.stdout(`Hello, ${name}!`);
    return 0;
};
