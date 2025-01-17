import { ImgStack } from "img-stacks";

// Using Lorem Picsum for demo images
// Each set gets a different seed to ensure unique but consistent images
const createImages = (seed: number) => [
  {
    src: `https://picsum.photos/seed/${seed}/800/600`,
    alt: "Beautiful random photograph 1",
    caption: "Photo from Lorem Picsum 1",
  },
  {
    src: `https://picsum.photos/seed/${seed + 1}/800/600`,
    alt: "Beautiful random photograph 2",
    caption: "Photo from Lorem Picsum 2",
  },
  {
    src: `https://picsum.photos/seed/${seed + 2}/800/600`,
    alt: "Beautiful random photograph 3",
    caption: "Photo from Lorem Picsum 3",
  },
];

function App() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
      }}
    >
      <section>
        <h2>Square (1:1)</h2>
        <ImgStack
          images={createImages(200)}
          size={{ type: "aspect-ratio", width: 200, ratio: "square" }}
        />
      </section>

      <section>
        <h2>Landscape (4:3)</h2>
        <ImgStack
          images={createImages(300)}
          size={{ type: "aspect-ratio", width: 300, ratio: "landscape" }}
        />
      </section>

      <section>
        <h2>Wide (16:9)</h2>
        <ImgStack
          images={createImages(400)}
          size={{ type: "aspect-ratio", width: 300, ratio: "wide" }}
        />
      </section>

      <section>
        <h2>Ultrawide (21:9)</h2>
        <ImgStack
          images={createImages(500)}
          size={{ type: "aspect-ratio", width: 300, ratio: "ultrawide" }}
        />
      </section>

      <section>
        <h2>Portrait (3:4)</h2>
        <ImgStack
          images={createImages(600)}
          size={{ type: "aspect-ratio", width: 300, ratio: "portrait" }}
        />
      </section>

      <section>
        <h2>Tall (9:16)</h2>
        <ImgStack
          images={createImages(700)}
          size={{ type: "aspect-ratio", width: 200, ratio: "tall" }}
        />
      </section>

      <section>
        <h2>Custom Ratio (2.35:1 Cinemascope)</h2>
        <ImgStack
          images={createImages(800)}
          size={{ type: "aspect-ratio", width: 300, ratio: 2.35 }}
        />
      </section>

      <section>
        <h2>Fixed Size (400x300)</h2>
        <ImgStack
          images={createImages(900)}
          size={{ type: "fixed", width: 300, height: 300 }}
        />
      </section>
    </div>
  );
}

export default App;
