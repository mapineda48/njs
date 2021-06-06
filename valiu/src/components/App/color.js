/**
 *https://css-tricks.com/snippets/javascript/random-hex-color/
 */
export default function randomColor() {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
}
//# sourceMappingURL=color.js.map