const manifest = require("../src/manifest.json");
const packageJson = require("../package.json");
const { writeFileSync } = require("fs");
const { resolve } = require("path");

manifest.version = packageJson.version;
manifest.description = packageJson.description;

writeFileSync(
  resolve(__dirname, "../dist/manifest.json"),
  JSON.stringify(manifest),
  { encoding: "utf8" }
);
