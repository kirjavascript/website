let parser = require('posthtml-parser');
let render = require('posthtml-render');
let urlModule = require('url');

module.exports = ({ hostname, url }, { headers, body }) => {

    let { protocol, host } = urlModule.parse(url);

    const prefixURL = (str) => {
        if (/^(https?:\/\/)/.test(str)) {
            return `http://${hostname}/${str}`;
        }
        else if (/^magnet:/.test(str)) {
            return str;
        }
        else if (str.indexOf('//') == 0) {
            return `http://${hostname}/${protocol}${str}`;
        }
        else {
            return `http://${hostname}/${protocol}//${host}${str}`;
        }
        
    }

    const prefixCSS = (str) => {
        return str.replace(/url\(("|')?(.*?)("|')?\)/g, (a, b, c, d, e) => {
            return `url(${prefixURL(c)})`;
        });
    }

    const prefixObj = (obj, accessor) => {
        if (obj && obj[accessor]) {
            obj[accessor] = prefixURL(obj[accessor]);
        }
    };

    if (~headers['content-type'].indexOf('html')) {
        let AST = parser(body.toString());

        walkHTML(AST, (element) => {
            let {tag, attrs, content} = element;
            if (tag == 'link' || tag == 'a') {
                prefixObj(attrs, 'href');
            }
            else if (tag == 'form') {
                prefixObj(attrs, 'action');
            }
            else if (tag == 'script' || tag == 'img') {
                prefixObj(attrs, 'src');
            }
            else if (tag == 'style') {
                element.content = content.map(prefixCSS);
            }
        });

        return render(AST);

        return '<pre>' + JSON.stringify(AST,null,4) + '</pre>';
    }
    else if (~headers['content-type'].indexOf('css')) {
        return prefixCSS(body.toString());
    }
    else {
        return body;
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