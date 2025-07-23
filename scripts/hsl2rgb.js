// convert-colors.js
const fs = require('fs');
const path = require('path');

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 360], [0, 100], and [0, 100] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @returns {object}          The RGB representation {r, g, b}
 */
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

/**
 * Processes a CSS string, converting HSL variables to RGB.
 * @param {string} cssContent The raw CSS content.
 * @returns {string} The processed CSS content with RGB values.
 */
function processCss(cssContent) {
  const lines = cssContent.split('\n');
  const outputLines = [];
  
  // Regex to find CSS variables with HSL values like: `246 25% 92.2%`
  const hslRegex = /^(.*--[\w-]+:)\s*(\d{1,3}(?:\.\d+)?)\s+(\d{1,3}(?:\.\d+)?)%\s+(\d{1,3}(?:\.\d+)?)%;(.*)$/i;

  for (const line of lines) {
    const match = line.match(hslRegex);

    if (match) {
      const [, prefix, hStr, sStr, lStr, suffix] = match;
      const h = parseFloat(hStr);
      const s = parseFloat(sStr);
      const l = parseFloat(lStr);

      const { r, g, b } = hslToRgb(h, s, l);
      
      // const newLine = `${prefix} rgb(${r}, ${g}, ${b});${suffix}`;
      const newLine = `${prefix} ${r} ${g} ${b}; ${suffix}`;
      outputLines.push(newLine);
    } else {
      // Keep lines that don't match (like comments, braces, etc.) as they are
      outputLines.push(line);
    }
  }

  return outputLines.join('\n');
}

// --- Main execution logic ---
function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.log("Usage: node convert-colors.js <input-file.css> <output-file.css>");
    process.exit(1);
  }

  const [inputFile, outputFile] = args;
  const inputPath = path.resolve(inputFile);
  const outputPath = path.resolve(outputFile);

  try {
    console.log(`Reading from: ${inputPath}`);
    const cssContent = fs.readFileSync(inputPath, 'utf8');
    
    console.log("Converting HSL values to RGB...");
    const convertedCss = processCss(cssContent);
    
    fs.writeFileSync(outputPath, convertedCss, 'utf8');
    console.log(`✅ Success! Converted file saved to: ${outputPath}`);
    
  } catch (error) {
    console.error("❌ An error occurred:", error.message);
    process.exit(1);
  }
}

main();