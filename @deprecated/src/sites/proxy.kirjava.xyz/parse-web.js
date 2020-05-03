const parser = require('posthtml-parser');
const render = require('posthtml-render');
const urlModule = require('url');

module.exports = ({ hostname, url, contentType, body }) => {
    const { protocol, host } = urlModule.parse(url);

    const prefixURL = (str, fullPrefix = true) => {
        const prefix = fullPrefix ? `http://${hostname}/` : '';
        if (/^(https?:\/\/)/.test(str)) {
            return `${prefix}${str}`;
        }
        else if (/^magnet:/.test(str)) {
            return str;
        }
        else if (str.indexOf('//') == 0) {
            return `${prefix}${protocol}${str}`;
        }
        else if (str[0] == '/') {
            return `${prefix}${protocol}//${host}${str}`;
        }
        else {
            return `${prefix}${protocol}//${host}/${str}`;
        }

    }

    const prefixCSS = (str) => {
        return str.replace(/url\(("|')?(.*?)("|')?\)/g, (a, b, c, d, e) => {
            return `url(${prefixURL(c, false)})`;
        });
    }

    const prefixObj = (obj, accessor, full) => {
        if (obj && obj[accessor]) {
            obj[accessor] = prefixURL(obj[accessor], full);
        }
    };

    if (~contentType.indexOf('html')) {
        const AST = parser(body.toString());

        walkHTML(AST, (element) => {
            const {tag, attrs, content} = element;
            if (tag == 'link' || tag == 'a') {
                prefixObj(attrs, 'href');
            }
            else if (tag == 'form') {
                prefixObj(attrs, 'action');
            }
            else if (tag == 'script' || tag == 'img') {
                prefixObj(attrs, 'src', false);
            }
            else if (tag == 'style' && content) {
                element.content = content.map(prefixCSS);
            }
        });

        return render(AST);

        return '<pre>' + JSON.stringify(AST,0,4) + '</pre>';
    }
    else if (~contentType.indexOf('css')) {
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
