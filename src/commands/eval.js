if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log("Eval command has been loaded, careful!");

    module.exports = (api, _context, ...args) => {
        try {
            let input = args.slice(1).join(" ");
            console.log(`Trying to eval: ${input}`);
            let val = eval(input);
            api.ok(JSON.stringify(val));
        } catch (e) {
            api.err(`Nope: ${e}`);
        }
        return 0;
    };
}
