import { styles } from "./styles.js";

let stylesInjected = false;

export function injectStyles(): void {
  if (stylesInjected) return;

  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
  stylesInjected = true;
}
