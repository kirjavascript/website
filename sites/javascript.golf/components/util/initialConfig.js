
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
        { preset: 'stage-3', enabled: false }
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