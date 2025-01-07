import React from "react";
import { injectStyles } from "./inject-styles.js";
const ASPECT_RATIOS = {
    square: { width: 1, height: 1 },
    landscape: { width: 4, height: 3 },
    wide: { width: 16, height: 9 },
    ultrawide: { width: 21, height: 9 },
    portrait: { width: 3, height: 4 },
    tall: { width: 9, height: 16 },
};
function calculateDimensions(size) {
    if (!size) {
        return {
            width: "100%",
            height: "180px",
        };
    }
    if (size.type === "fixed") {
        return {
            width: `${size.width}px`,
            maxWidth: "100vw",
            height: `${size.height}px`,
        };
    }
    if (typeof size.ratio === "number") {
        return {
            width: `${size.width}px`,
            maxWidth: "100vw",
            height: "auto",
            aspectRatio: `${size.ratio}/1`,
        };
    }
    const { width, height } = ASPECT_RATIOS[size.ratio];
    return {
        width: `${size.width}px`,
        maxWidth: "100vw",
        height: "auto",
        aspectRatio: `${width}/${height}`,
    };
}
function getAspectRatio(size) {
    if (!size)
        return undefined;
    if (size.type === "fixed") {
        return `${size.width}/${size.height}`;
    }
    if (typeof size.ratio === "number") {
        return `${size.ratio}/1`;
    }
    const { width, height } = ASPECT_RATIOS[size.ratio];
    return `${width}/${height}`;
}
export function ImgStack({ images, className = "", size }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const dialogRefs = React.useRef([]);
    const buttonRefs = React.useRef([]);
    const [initialAnimationComplete, setInitialAnimationComplete] = React.useState(false);
    const dimensions = React.useMemo(() => calculateDimensions(size), [size]);
    const aspectRatio = React.useMemo(() => getAspectRatio(size), [size]);
    React.useEffect(() => {
        injectStyles();
        const root = document.documentElement;
        for (let i = 1; i <= 5; i++) {
            const isNegative = i % 2 === 1;
            const randomAngle = (Math.random() * 6 + 2) * (isNegative ? -1 : 1);
            root.style.setProperty(`--stack-rotation-${i}`, `${randomAngle}deg`);
        }
    }, []);
    React.useEffect(() => {
        const dialog = dialogRefs.current[0];
        if (!dialog)
            return;
        if (dialogOpen) {
            dialog.showModal();
            requestAnimationFrame(() => {
                dialog.classList.add("dialog-open");
            });
        }
        else {
            dialog.classList.remove("dialog-open");
            // Wait for the transition to complete before closing
            setTimeout(() => {
                dialog.close();
                const button = buttonRefs.current[0];
                if (button) {
                    button.focus();
                }
            }, 200); // Match transition duration
        }
    }, [dialogOpen]);
    const imagesLength = images.length;
    const btnLabel = imagesLength === 1
        ? "View 1 project image"
        : `View ${imagesLength} project images`;
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { ref: (el) => {
                buttonRefs.current[0] = el;
            }, className: `project-images-stack ${className}`, onClick: () => setDialogOpen(true), "aria-label": btnLabel, style: dimensions }, images.map((image, i) => (React.createElement("div", { key: i, className: "project-image-wrapper", style: {
                top: `${i * 4}px`,
                "--stack-rotation": `var(--stack-rotation-${i + 1}, ${i % 2 ? 4 : -4}deg)`,
                "--stack-translate-x": `${i % 2 ? 8 : -8}px`,
                zIndex: images.length - i,
                transform: "rotate(var(--stack-rotation)) translate(var(--stack-translate-x))",
                animation: !initialAnimationComplete
                    ? `stack-rotate-1 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards ${i * 0.1}s`
                    : undefined,
                overflow: "hidden",
            } },
            React.createElement("img", { className: "project-image", src: image.src, alt: image.alt }),
            i === 0 && React.createElement("div", { className: "project-image-caption" }, btnLabel))))),
        React.createElement("dialog", { ref: (el) => {
                dialogRefs.current[0] = el;
            }, className: "project-dialog", onCancel: (e) => {
                e.preventDefault();
                setDialogOpen(false);
            }, onClick: (e) => {
                if (e.target === e.currentTarget) {
                    setDialogOpen(false);
                }
            } },
            React.createElement("div", { className: "dialog-content" },
                React.createElement("header", { className: "dialog-header" },
                    React.createElement("h2", { className: "dialog-title" }, "Project Images"),
                    React.createElement("button", { className: "dialog-close", onClick: () => setDialogOpen(false), "aria-label": "Close dialog" }, "\u00D7")),
                React.createElement("div", { className: "dialog-body" }, images.map((image, i) => (React.createElement("figure", { key: i },
                    React.createElement("img", { src: image.src, alt: image.alt, style: aspectRatio ? { aspectRatio } : undefined }),
                    React.createElement("figcaption", null, image.caption)))))))));
}
