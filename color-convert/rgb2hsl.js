// convert-colors.js
const fs = require('fs');
const path = require('path');
 

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1, // 最少保留一位小数
  maximumFractionDigits: 1, // 最多保留一位小数
  roundingMode: 'halfExpand', // 四舍五入模式
});
/**
 * 将 RGB 颜色值转换为 HSL 字符串。
 * @param {number} r - 红色值 (0-255)
 * @param {number} g - 绿色值 (0-255)
 * @param {number} b - 蓝色值 (0-255)
 * @returns {string} HSL 格式的字符串, e.g., "H S% L%"
 */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    // achromatic (grayscale)
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  h = formatter.format(h * 360);
  s = formatter.format(s * 100);
  l = formatter.format(l * 100);

  return {h, s, l};
}


// // 2. 使用正则表达式查找并替换所有 RGB 颜色值
// const hslCssContent = cssContent.replace(
//   /(--[\w-]+):\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3});/g,
//   (match, variable, r, g, b) => {
//     const rNum = parseInt(r, 10);
//     const gNum = parseInt(g, 10);
//     const bNum = parseInt(b, 10);

//     const hslValue = rgbToHsl(rNum, gNum, bNum);
    
//     // 返回新格式的 CSS 属性行
//     return `${variable}: ${hslValue};`;
//   }
// );

/**
 * Processes a CSS string, converting HSL variables to RGB.
 * @param {string} cssContent The raw CSS content.
 * @returns {string} The processed CSS content with RGB values.
 */
function processCss(cssContent) {
  const lines = cssContent.split('\n');
  const outputLines = [];
  
  // Regex to find CSS variables with HSL values like: `246 25% 92.2%`
  // const hslRegex = /^(.*--[\w-]+:)\s*(\d{1,3}(?:\.\d+)?)\s+(\d{1,3}(?:\.\d+)?)%\s+(\d{1,3}(?:\.\d+)?)%;(.*)$/i;
  const rgbRegex = /^(.*--[\w-]+:)\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3});(.*)$/i;
  for (const line of lines) {
    const match = line.match(rgbRegex);

    if (match) {
      const [, prefix, rStr, gStr, bStr, suffix] = match;
      const r = parseInt(rStr);
      const g = parseInt(gStr);
      const b = parseInt(bStr);

      const { h, s, l } = rgbToHsl(r, g, b);
      
      const newLine = `${prefix} ${h} ${s}% ${l}%; ${suffix}`;
      console.log("newLine", newLine);
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