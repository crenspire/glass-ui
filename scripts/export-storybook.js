#!/usr/bin/env node

/**
 * Export Storybook static files to public/storybook/
 * Cross-platform copy, run before `pnpm build` so Storybook ships at /storybook on GitHub Pages
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(process.cwd(), 'storybook-static');
const targetDir = path.join(process.cwd(), 'public', 'storybook');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy files recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Check if source directory exists
if (!fs.existsSync(sourceDir)) {
  console.error(`Error: Source directory "${sourceDir}" does not exist.`);
  console.error('Please run "pnpm build-storybook" first.');
  process.exit(1);
}

// Remove existing target directory if it exists
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}

// Copy files
console.log(`Copying Storybook files from ${sourceDir} to ${targetDir}...`);
copyRecursiveSync(sourceDir, targetDir);
console.log('✓ Storybook files exported successfully!');

