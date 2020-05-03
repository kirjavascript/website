export default function formatBytes(input) {
    const sizes = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];
    const LEN = sizes.length;
    let index = Math.floor(Math.log(input) / Math.log(1024));
    let val = input / (1024 ** index);
    let suffix = index < LEN ? sizes[index] : "?";
    return `${(do{ if (index === 0) { val; } else { val.toFixed(3); } })}${suffix}B`;
}
