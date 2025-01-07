#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --allow-env --allow-run
/// <reference lib="deno.ns" />

import { build, emptyDir } from "https://deno.land/x/dnt@0.38.1/mod.ts";

// Get version from command line arguments
const version = Deno.args[0];
if (!version) {
  console.error("Version argument is required");
  Deno.exit(1);
}

async function start() {
  await emptyDir("./npm");

  await build({
    entryPoints: ["./main.ts"],
    outDir: "./npm",
    shims: {
      deno: true,
    },
    package: {
      name: "img-stacks",
      version: version,
      description: "Beautiful, interactive image stacks for React",
      license: "MIT",
      repository: {
        type: "git",
        url: "git+https://github.com/antibland/img-stacks.git",
      },
      bugs: {
        url: "https://github.com/antibland/img-stacks/issues",
      },
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
      },
      devDependencies: {
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
        typescript: "^5.0.0",
      },
      peerDependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
      },
    },
    typeCheck: false,
    test: false,
  });

  await Deno.copyFile("LICENSE", "npm/LICENSE");
  await Deno.copyFile("README.md", "npm/README.md");
}

start();
