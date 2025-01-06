# ImgStack

A React component for creating beautiful, interactive image stacks with configurable aspect ratios and responsive behavior.

## Demo

https://user-images.githubusercontent.com/antibland/npm-img-stacks/assets/demo.mov

Showcase your beautiful work in an accessible image stack. Dialogs can be dismissed by pressing the escape key, the close button, or simply clicking outside of the dialog itself.

## Features

- 🖼️ Stacked image presentation with hover effects
- 📐 Configurable aspect ratios (predefined or custom)
- 📱 Responsive design with mobile-first approach
- 🎭 Dark mode support
- 🔍 Modal view for full-size images
- ✨ Smooth animations and transitions
- ♿ Accessibility-friendly

## Installation

```bash
npm install img-stacks
```

## Usage

```tsx
import { ImgStack } from "img-stacks";

function MyComponent() {
  const images = [
    {
      src: "path/to/image1.jpg",
      alt: "Description of image 1",
      caption: "Caption for image 1",
    },
    {
      src: "path/to/image2.jpg",
      alt: "Description of image 2",
      caption: "Caption for image 2",
    },
  ];

  return (
    <ImgStack
      images={images}
      size={{ type: "aspect-ratio", width: 400, ratio: "wide" }}
    />
  );
}
```

## Configuration

### Image Configuration

Each image in the stack requires the following properties:

```typescript
interface StackImage {
  src: string; // URL of the image
  alt: string; // Alt text for accessibility
  caption: string; // Caption shown in the dialog view
}
```

### Size Configuration

The component supports two types of size configuration:

#### 1. Aspect Ratio

```typescript
{
  type: "aspect-ratio";
  width: number; // Desired width in pixels
  ratio: AspectRatio; // Predefined ratio or custom number
}
```

Predefined aspect ratios:

- `"square"` (1:1)
- `"landscape"` (4:3)
- `"wide"` (16:9)
- `"ultrawide"` (21:9)
- `"portrait"` (3:4)
- `"tall"` (9:16)

Or use a custom numeric ratio (e.g., 2.35 for cinemascope).

#### 2. Fixed Size

```typescript
{
  type: "fixed";
  width: number; // Width in pixels
  height: number; // Height in pixels
}
```

### Responsive Behavior

The component is inherently responsive:

- Uses the specified width as a maximum
- Automatically scales down on smaller screens
- Maintains aspect ratio at all sizes
- No horizontal scrollbars

## Examples

### Default (Responsive)

```tsx
<ImgStack images={images} />
```

### Square Aspect Ratio

```tsx
<ImgStack
  images={images}
  size={{ type: "aspect-ratio", width: 300, ratio: "square" }}
/>
```

### Custom Aspect Ratio (Cinemascope)

```tsx
<ImgStack
  images={images}
  size={{ type: "aspect-ratio", width: 400, ratio: 2.35 }}
/>
```

### Fixed Size

```tsx
<ImgStack images={images} size={{ type: "fixed", width: 400, height: 300 }} />
```

## Best Practices

1. Use same-size images for best visual results
2. Provide meaningful alt text for accessibility
3. Keep image stacks to 3-5 images for optimal performance
4. Use aspect ratios that match your content type
5. Consider mobile users when setting widths

## License

MIT
