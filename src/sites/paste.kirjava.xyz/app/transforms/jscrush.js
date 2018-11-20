import jscrush from 'jscrush';

self.onmessage = ({ data: { code } }) => {
    self.postMessage({ code: jscrush(code) });
};
