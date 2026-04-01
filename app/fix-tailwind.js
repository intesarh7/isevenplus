const fs = require("fs");
const path = require("path");

const rootDir = "./"; // project root

// file extensions to scan
const exts = [".js", ".ts", ".jsx", ".tsx", ".html"];

function replaceContent(content) {
  return content
    .replace(/bg-linear-to-r/g, "bg-gradient-to-r")
    .replace(/bg-linear-to-l/g, "bg-gradient-to-l")
    .replace(/bg-linear-to-t/g, "bg-gradient-to-t")
    .replace(/bg-linear-to-b/g, "bg-gradient-to-b")
    .replace(/bg-linear-to-tr/g, "bg-gradient-to-tr")
    .replace(/bg-linear-to-tl/g, "bg-gradient-to-tl")
    .replace(/bg-linear-to-br/g, "bg-gradient-to-br")
    .replace(/bg-linear-to-bl/g, "bg-gradient-to-bl");
}

function scanDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      if (file === "node_modules" || file === ".next") return;
      scanDir(fullPath);
    } else {
      if (exts.includes(path.extname(file))) {
        let content = fs.readFileSync(fullPath, "utf8");
        const updated = replaceContent(content);

        if (content !== updated) {
          fs.writeFileSync(fullPath, updated, "utf8");
          console.log("✔ Fixed:", fullPath);
        }
      }
    }
  });
}

scanDir(rootDir);

console.log("🔥 Tailwind v4 → v3 conversion complete!");