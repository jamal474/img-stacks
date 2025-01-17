export const styles = `
/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

button {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  outline: none;
}

:root {
  --color-text: #2c3e50;
  --color-background: #ffffff;
  --color-border: rgba(0, 0, 0, 0.1);
  --dialog-backdrop: rgba(0, 0, 0, 0.5);
  --transition-speed: 0.3s;
  --transition-bounce: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  --transition-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --space-3: 1rem;
  --text-sm: 0.875rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #ecf0f1;
    --color-background: #1a1a1a;
    --color-border: rgba(255, 255, 255, 0.1);
    --dialog-backdrop: rgba(0, 0, 0, 0.7);
  }
}

.project-images-stack {
  position: relative;
  margin: var(--space-3) 0 0;
  display: flex;
  justify-content: center;
  perspective: 1000px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  transform-origin: center;
}

@media (hover: none) {
  .project-images-stack {
    touch-action: pan-x;
  }

  .project-image-caption {
    display: none;
  }
}

.project-image-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(var(--stack-rotation)) translate(var(--stack-translate-x));
}

.project-images-stack[data-in-view="true"] .project-image-wrapper {
  animation: stack-rotate-1 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards;
}

@keyframes stack-rotate-1 {
  from {
    transform: rotate(0deg) translate(0);
  }
  to {
    transform: rotate(var(--stack-rotation)) translate(var(--stack-translate-x));
  }
}

@keyframes top-elem-hover {
  to {
    transform: rotate(0deg) translate(0) scale(1.02);
    box-shadow: 0 8px 16px #00000026;
  }
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.project-image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000b3;
  color: #fff;
  padding: 6px;
  font-size: var(--text-sm);
  opacity: 0;
  transform: translateY(100%);
  transition: opacity .3s ease, transform .3s cubic-bezier(.34,1.56,.64,1);
  text-align: center;
}

.project-images-stack:hover .project-image-caption {
  opacity: 1;
  transform: translateY(0);
}

.project-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(.95);
  border: none;
  border-radius: 12px;
  padding: 0;
  max-width: 90vw;
  max-height: 90vh;
  width: 800px;
  background: var(--color-background);
  color: var(--color-text);
  pointer-events: none;
  opacity: 0;
  transition: opacity .2s ease, transform .2s ease;
}

.project-dialog.dialog-open {
  opacity: 1;
  pointer-events: inherit;
  transform: translate(-50%, -50%) scale(1);
}

.project-dialog::backdrop {
  background: var(--dialog-backdrop);
  opacity: 0;
  transition: opacity var(--transition-speed) var(--transition-ease);
}

.project-dialog.dialog-open::backdrop {
  opacity: 1;
}

.dialog-content {
  padding: 20px;
  overflow-y: auto;
  max-height: 90vh;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dialog-title {
  margin: 0;
  font-size: 1.5rem;
}

.dialog-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px 10px;
  color: var(--color-text);
  transition: opacity var(--transition-speed) var(--transition-ease);
}

.dialog-close:hover {
  opacity: 0.7;
}

.dialog-body {
  display: grid;
  gap: 20px;
}

.dialog-body figure {
  margin: 0;
}

.dialog-body img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  object-fit: cover;
}

.dialog-body figcaption {
  margin-top: 8px;
  text-align: center;
}

.project-images-stack:hover .project-image-wrapper:first-child {
  animation: top-elem-hover .4s cubic-bezier(.34,1.56,.64,1) .1s forwards !important;
}

@media (hover: none) {
  .project-image-caption {
    display: none;
  }

  .project-images-stack:hover .project-image-wrapper:first-child {
    animation: none !important;
  }

  .project-image-wrapper {
    opacity: 0;
    transform: translateX(30px) rotate(var(--stack-rotation)) translate(var(--stack-translate-x));
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: transform, opacity;
  }

  .project-image-wrapper[data-visible="true"] {
    opacity: 1;
    transform: translateX(0) rotate(var(--stack-rotation)) translate(var(--stack-translate-x));
  }
}
`;
