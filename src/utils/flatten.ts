const flatten = <T extends any[]>(list: T) => [].concat.apply([], list);


export default flatten;