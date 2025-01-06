import React from "react";
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
export type AspectRatio = "square" | "landscape" | "wide" | "ultrawide" | "portrait" | "tall" | number;
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
    /** Optional CSS class name */
    className?: string;
    /**
     * Size configuration for the stack
     * @default { width: "100%", height: "180px" }
     */
    size?: StackSizeConfig;
}
export declare function ImgStack({ images, className, size }: ImgStackProps): React.JSX.Element;
