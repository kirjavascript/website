import packer from 'javascript-packer';

self.onmessage = ({ data: { code, shouldEval } }) => {
    // self.postMessage({ code: JSFuck.encode(code, shouldEval) });
    console.log(packer);
    // code, base62, shrink
};
