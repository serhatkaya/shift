// generateVersionFile.js
const fs = require("fs");
const path = require("path");
const packageJson = require("../../package.json");

const version = packageJson.version;
const content = `window.APP_VERSION = '${version}';`;

fs.writeFileSync(
  path.resolve(process.cwd(), "src", "assets", "version.js"),
  content
);
