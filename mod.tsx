import React from "react";
import { injectStyles } from "./inject-styles.ts";

/**
 * Represents an image in the stack with its metadata
 */
export interface StackImage {
  /** URL of the image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Caption shown in the dialog view */
  caption: string;
}

/**
 * Predefined aspect ratios for common use cases, or a custom numeric ratio
 * For custom ratios, provide the width/height value (e.g., 2.35 for cinemascope)
 */
export type AspectRatio =
  | "square" // 1:1
  | "landscape" // 4:3
  | "wide" // 16:9
  | "ultrawide" // 21:9
  | "portrait" // 3:4
  | "tall" // 9:16
  | number; // custom ratio (width/height)

/**
 * Configuration for fixed-size image stacks
 * Use this when you want exact pixel dimensions
 */
export interface FixedSizeConfig {
  type: "fixed";
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
}

/**
 * Configuration for aspect-ratio-based image stacks
 * Use this when you want to maintain a specific aspect ratio
 */
export interface AspectRatioConfig {
  type: "aspect-ratio";
  /** Width in pixels - height will be calculated based on the ratio */
  width: number;
  /** Aspect ratio - either a predefined value or a custom number */
  ratio: AspectRatio;
}

/** Configuration for the size of the image stack */
export type StackSizeConfig = FixedSizeConfig | AspectRatioConfig;

/** Props for the ImgStack component */
export interface ImgStackProps {
  /** Array of images to display in the stack */
  images: StackImage[];
  /** Subject of the image group */
  subject?: string;
  /** Optional CSS class name */
  className?: string;
  /**
   * Size configuration for the stack
   * @default { width: "100%", height: "180px" }
   */
  size?: StackSizeConfig;
}

interface AspectRatioPair {
  width: number;
  height: number;
}

const ASPECT_RATIOS: Record<Exclude<AspectRatio, number>, AspectRatioPair> = {
  square: { width: 1, height: 1 },
  landscape: { width: 4, height: 3 },
  wide: { width: 16, height: 9 },
  ultrawide: { width: 21, height: 9 },
  portrait: { width: 3, height: 4 },
  tall: { width: 9, height: 16 },
};

function calculateDimensions(
  size: StackSizeConfig | undefined
): React.CSSProperties {
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

function getAspectRatio(size: StackSizeConfig | undefined): string | undefined {
  if (!size) return undefined;

  if (size.type === "fixed") {
    return `${size.width}/${size.height}`;
  }

  if (typeof size.ratio === "number") {
    return `${size.ratio}/1`;
  }

  const { width, height } = ASPECT_RATIOS[size.ratio];
  return `${width}/${height}`;
}

export function ImgStack({ images, subject = "Project", className = "", size }: ImgStackProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [animatedStacks, setAnimatedStacks] = React.useState<number[]>([]);
  const [isHovered, setIsHovered] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const stackRef = React.useRef<HTMLButtonElement>(null);
  const dialogRefs = React.useRef<(HTMLDialogElement | null)[]>([]);
  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = React.useRef<number | null>(null);
  const touchMoveX = React.useRef<number | null>(null);

  const dimensions = React.useMemo(() => calculateDimensions(size), [size]);
  const aspectRatio = React.useMemo(() => getAspectRatio(size), [size]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchMoveX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchMoveX.current === null) return;

    const deltaX = touchMoveX.current - touchStartX.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX < 0 && currentIndex < images.length - 1) {
        // Swipe left - next image
        setCurrentIndex((prev) => prev + 1);
      } else if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - previous image
        setCurrentIndex((prev) => prev - 1);
      }
    }

    touchStartX.current = null;
    touchMoveX.current = null;
  };

  // Separate effect for styles and rotation setup
  React.useEffect(() => {
    injectStyles();
    const root = document.documentElement;
    for (let i = 1; i <= 5; i++) {
      const isNegative = i % 2 === 1;
      const randomAngle = (Math.random() * 6 + 2) * (isNegative ? -1 : 1);
      root.style.setProperty(`--stack-rotation-${i}`, `${randomAngle}deg`);
    }
  }, []);

  // Separate effect for intersection observer
  React.useEffect(() => {
    // Wait for next frame to ensure layout is complete
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Animate stacks one by one with delays
              images.forEach((_, index) => {
                setTimeout(() => {
                  setAnimatedStacks((prev) => [...prev, index]);
                }, index * 100);
              });
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "50px",
        }
      );

      if (stackRef.current) {
        observer.observe(stackRef.current);
      }

      return () => observer.disconnect();
    }, 100); // Small delay to ensure layout is complete

    return () => clearTimeout(timeoutId);
  }, [images.length]);

  // Dialog effect
  React.useEffect(() => {
    const dialog = dialogRefs.current[0];
    if (!dialog) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === "opacity" && !dialogOpen) {
        dialog.close();
      }
    };

    dialog.addEventListener("transitionend", handleTransitionEnd);

    if (dialogOpen) {
      dialog.showModal();
      // Force a reflow before adding the open class
      void dialog.offsetWidth;
      dialog.classList.add("dialog-open");
    } else {
      dialog.classList.remove("dialog-open");
    }

    return () => {
      dialog.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [dialogOpen]);

  const imagesLength = images.length;
  const btnLabel =
    imagesLength === 1
      ? `View 1 ${subject} image`
      : `View ${imagesLength} ${subject} images`;

  return (
    <div className = "img-stack-root" style={{ ...dimensions, position: "relative" }}>
      <button
        ref={(el) => {
          stackRef.current = el;
          buttonRefs.current[0] = el;
        }}
        className={`project-images-stack ${className}`}
        data-in-view={animatedStacks.length > 0 ? "true" : "false"}
        onClick={() => setDialogOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label={btnLabel}
        style={{ position: "absolute", inset: 0 }}
      >
        {images.map((image, i) => (
          <div
            key={i}
            className="project-image-wrapper"
            data-visible={i >= currentIndex && i <= currentIndex + 2}
            style={
              {
                top: `${i * 4}px`,
                "--stack-rotation": `var(--stack-rotation-${i + 1}, ${
                  i % 2 ? 4 : -4
                }deg)`,
                "--stack-translate-x": `${i % 2 ? 8 : -8}px`,
                zIndex: images.length - i,
                overflow: "hidden",
                visibility:
                  i >= currentIndex && i <= currentIndex + 2
                    ? "visible"
                    : "hidden",
              } as React.CSSProperties
            }
          >
            <img className="project-image" src={image.src} alt={image.alt} />
            {i === currentIndex && (
              <div className="project-image-caption">{btnLabel}</div>
            )}
          </div>
        ))}
      </button>

      <dialog
        ref={(el) => {
          dialogRefs.current[0] = el;
        }}
        className="project-dialog"
        onCancel={(e) => {
          e.preventDefault();
          setDialogOpen(false);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setDialogOpen(false);
          }
        }}
      >
        <div className="dialog-content">
          <header className="dialog-header">
            <h2 className="dialog-title">{subject} Images</h2>
            <button
              className="dialog-close"
              onClick={() => setDialogOpen(false)}
              aria-label="Close dialog"
            >
              ×
            </button>
          </header>
          <div className="dialog-body">
            {images.map((image, i) => (
              <figure key={i}>
                <img
                  src={image.src}
                  alt={image.alt}
                  style= {image.aspectRatio ? {aspectRatio: image.aspectRatio} : (aspectRatio ? { aspectRatio } : undefined)}
                />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
}
