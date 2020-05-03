import crc32 from 'crc32';

const chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~()'!*:@,;`;

export default function hash(str) {
    return crc32(str)
        .padStart(8, 0)
        .match(/../g)
        .map(hex => chars[parseInt(hex, 16) % chars.length])
        .join('');
}
