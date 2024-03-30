const getArgs = (args) => {
    const res = {};
    const [executer, file, ...rest] = args;
    rest.forEach((arg, index, array) => {
        if (arg.charAt(0) !== '-') return;
        const argName = arg.substring(1);
        if (index === array.length - 1) {
            res[argName] = true;
        } else if (array[index + 1].charAt(0) !== '-') {
            res[argName] = array[index + 1];
        } else {
            res[argName] = true;
        }
    })

    return res;
}

export {
    getArgs
}