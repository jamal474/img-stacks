#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --allow-env --allow-run

import { build, emptyDir } from "https://deno.land/x/dnt@0.38.1/mod.ts";

async function start() {
  await emptyDir("./npm");

  await build({
    entryPoints: ["./mod.tsx"],
    outDir: "./npm",
    shims: {
      deno: true,
    },
    test: false,
    typeCheck: "both",
    compilerOptions: {
      importHelpers: false,
      sourceMap: true,
      target: "ES2021",
      lib: ["esnext", "dom", "dom.iterable"],
      jsx: "react-jsx",
    },
    package: {
      name: "img-stacks",
      version: Deno.args[0],
      description:
        "A React component for displaying stacked images with interactive features",
      license: "MIT",
      keywords: ["react", "images", "gallery", "stack", "animation"],
      engines: {
        node: ">=14.0.0",
      },
      repository: {
        type: "git",
        url: "git+https://github.com/antibland/img-stacks.git",
      },
      bugs: {
        url: "https://github.com/antibland/img-stacks/issues",
      },
      peerDependencies: {
        react: "^17.0.0 || ^18.0.0",
        "react-dom": "^17.0.0 || ^18.0.0",
      },
    },
  });

  await Deno.copyFile("LICENSE", "npm/LICENSE");
  await Deno.copyFile("README.md", "npm/README.md");
}

start();
