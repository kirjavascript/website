let parser = require('posthtml-parser');
let render = require('posthtml-render');
let urlModule = require('url')

module.exports = ({ hostname, url }, { text, header }) => {

    let isHTML = ~header['content-type'].indexOf('html');

    if (!isHTML) return text;

    let { protocol, host } = urlModule.parse(url);

    const prefix = (obj, accessor) => {
        if (obj && obj[accessor] && !/^(https?:\/\/|\/\/)/.test(obj[accessor])) {
            obj[accessor] = `http://${hostname}/${protocol}//${host}` + obj[accessor];
        }
    };

    let AST = parser(text);

    walk(AST, (element) => {
        let {tag, attrs, content} = element;
        if (tag == 'link' || tag == 'a') {
            prefix(attrs, 'href');
        }
        else if (tag == 'script' || tag == 'img') {
            prefix(attrs, 'src');
        }
    });

    return render(AST);

    return '<pre>' + JSON.stringify(AST,null,4) + '</pre>';
};

function walk(tree, callback) {

    Array.isArray(tree) && 
    tree.forEach(element => {
        if (typeof element == 'object') {
            callback(element);
            if (element.content) {
                walk(element.content, callback);
            }
        }
    })

}