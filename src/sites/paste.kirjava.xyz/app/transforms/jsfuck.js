import { JSFuck } from 'jsfuck';

self.onmessage = ({ data: { code, shouldEval } }) => {
    self.postMessage({ code: JSFuck.encode(code, shouldEval) });
};
