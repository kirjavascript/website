let parser = require('posthtml-parser');
let render = require('posthtml-render');
let urlModule = require('url');

module.exports = ({ hostname, url }, { text, header, body }) => {

    let { protocol, host } = urlModule.parse(url);

    const prefixURL = (str) => {
        return `http://${hostname}/${protocol}//${host}${str}`;
    }

    const prefixObj = (obj, accessor) => {
        if (obj && obj[accessor] ) {
            obj[accessor] = prefixURL(obj[accessor]);
        }
    };

    if (~header['content-type'].indexOf('html')) {
        let AST = parser(text);

        walkHTML(AST, (element) => {
            let {tag, attrs, content} = element;
            if (tag == 'link' || tag == 'a') {
                prefixObj(attrs, 'href');
            }
            else if (tag == 'script' || tag == 'img') {
                prefixObj(attrs, 'src');
            }
        });

        return render(AST);

        return '<pre>' + JSON.stringify(AST,null,4) + '</pre>';
    }
    else if (~header['content-type'].indexOf('css')) {
        return text.replace(/url\(("|')?(.*)("|')?\)/g, (a, b, c, d, e) => {
            return `url(${prefixURL(c)})`;
        });
    }
    else if (~header['content-type'].indexOf('image')) {
        return body;
    }
    else {
        return text;
    }

};

function walkHTML(tree, callback) {

    Array.isArray(tree) && 
    tree.forEach(element => {
        if (typeof element == 'object') {
            callback(element);
            if (element.content) {
                walkHTML(element.content, callback);
            }
        }
    })

}