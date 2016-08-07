
let config = {

    theme: 'monokai',
    wrap: true,
    indent: 4,
    babel: [
        { preset: 'es2015', enabled: true },
        { preset: 'react', enabled: true },
        { preset: 'stage-0', enabled: true },
        { preset: 'stage-1', enabled: false },
        { preset: 'stage-2', enabled: false },
        { preset: 'stage-3', enabled: false },
    ],
    lebab: [
        { option: 'arrow', enabled: true },
        { option: 'let', enabled: true },
        { option: 'arg-spread', enabled: true },
        { option: 'obj-method', enabled: true },
        { option: 'obj-shorthand', enabled: true },
        { option: 'no-strict', enabled: true },
        { option: 'commonjs', enabled: true },
        { option: 'class', enabled: false },
        { option: 'template', enabled: false },
        { option: 'default-param', enabled: false },
        { option: 'exponent', enabled: false },
    ]

};

let storedConfig = localStorage.getItem('config');

if (storedConfig) {
    try {
        storedConfig = JSON.parse(storedConfig);
    }
    catch(e) { 
        localStorage.removeItem('config');
        console.error('Error: localStorage is corrupted')
    }

    config = storedConfig;
}

export default function() {

    return Object.assign({}, config);

}

window.__reset = function() {
    localStorage.removeItem('config');
}