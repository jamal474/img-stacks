"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectStyles = void 0;
const styles_js_1 = require("./styles.js");
let stylesInjected = false;
function injectStyles() {
    if (stylesInjected)
        return;
    const styleElement = document.createElement("style");
    styleElement.textContent = styles_js_1.styles;
    document.head.appendChild(styleElement);
    stylesInjected = true;
}
exports.injectStyles = injectStyles;
