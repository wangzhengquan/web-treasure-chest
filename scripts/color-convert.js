#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

console.log('通用颜色转换 Echo 程序已启动。');
console.log('输入 RGB (e.g., rgb(231 230 240))');
console.log('输入 HSL (e.g., hsl(246 25% 92.2%))');
console.log('输入 Hex (e.g., #E7E6F0 或 E7E6F0)');
console.log('程序将输出其他两种对应的颜色代码。');
console.log('输入 "exit" 退出。');

rl.prompt();

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('再见！');
    rl.close();
    return;
  }

  const trimmedInput = input.trim();
  let r, g, b; // 统一转换为 RGB 进行内部处理

  // 尝试解析各种输入格式
  const rgbMatch = trimmedInput.match(/^rgb\((\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)\)$/i);
  const hslMatch = trimmedInput.match(/^hsl\((\d+\.?\d*)\s*,?\s*(\d+\.?\d*)%?\s*,?\s*(\d+\.?\d*)%?\)$/i);
  const hexMatch = trimmedInput.match(/^#?([0-9a-fA-F]{3}([0-9a-fA-F]{3})?)$/); // 3或6位hex，可选#

  if (rgbMatch) {
    const parsedR = parseInt(rgbMatch[1]);
    const parsedG = parseInt(rgbMatch[2]);
    const parsedB = parseInt(rgbMatch[3]);
    if (isValidRgb(parsedR, parsedG, parsedB)) {
      r = parsedR;
      g = parsedG;
      b = parsedB;
    } else {
      console.log(`无效的 RGB 值: ${input}`);
      rl.prompt();
      return;
    }
  } else if (hslMatch) {
    const h = parseFloat(hslMatch[1]);
    const s = parseFloat(hslMatch[2]);
    const l = parseFloat(hslMatch[3]);
    if (isValidHsl(h, s, l)) {
      const rgb = hslToRgb(h, s, l);
      r = Math.round(rgb[0]);
      g = Math.round(rgb[1]);
      b = Math.round(rgb[2]);
    } else {
      console.log(`无效的 HSL 值: ${input}`);
      rl.prompt();
      return;
    }
  } else if (hexMatch) {
    const hex = hexMatch[1];
    if (isValidHex(hex)) {
      const rgb = hexToRgb(hex);
      r = rgb[0];
      g = rgb[1];
      b = rgb[2];
    } else {
      console.log(`无效的 Hex 值: ${input}`);
      rl.prompt();
      return;
    }
  } else {
    console.log(`无法识别的颜色格式或无效输入: ${input}`);
    rl.prompt();
    return;
  }

  // 统一转换为 RGB 后，输出其他两种格式
  const hsl = rgbToHsl(r, g, b);
  const hex = rgbToHex(r, g, b);

  let outputString = '';
  if (!rgbMatch) { // 如果输入不是RGB，则输出RGB
    outputString += `rgb(${r} ${g} ${b})\n`;
  }
  if (!hslMatch) { // 如果输入不是HSL，则输出HSL
    outputString += `hsl(${hsl[0].toFixed(1)} ${hsl[1].toFixed(1)}% ${hsl[2].toFixed(1)}%)\n`;
  }
  if (!hexMatch) { // 如果输入不是Hex，则输出Hex
    outputString += `#${hex}`;
  }

  console.log(outputString.trim()); // trim() 移除末尾多余的换行符
  rl.prompt();
});

rl.on('close', () => {
  process.exit(0);
});

// --- 颜色转换和验证函数 ---

/**
 * 检查 RGB 值是否有效
 * @param {number} r - 红色 (0-255)
 * @param {number} g - 绿色 (0-255)
 * @param {number} b - 蓝色 (0-255)
 * @returns {boolean}
 */
function isValidRgb(r, g, b) {
  return r >= 0 && r <= 255 &&
         g >= 0 && g <= 255 &&
         b >= 0 && b <= 255;
}

/**
 * 检查 HSL 值是否有效
 * @param {number} h - 色相 (0-360)
 * @param {number} s - 饱和度 (0-100)
 * @param {number} l - 亮度 (0-100)
 * @returns {boolean}
 */
function isValidHsl(h, s, l) {
  return h >= 0 && h <= 360 &&
         s >= 0 && s <= 100 &&
         l >= 0 && l <= 100;
}

/**
 * 检查 Hex 字符串是否有效 (3位或6位)
 * @param {string} hex - Hex 颜色字符串 (不含#)
 * @returns {boolean}
 */
function isValidHex(hex) {
    return /^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(hex);
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 360], [0, 100], [0, 100].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 360], [0, 100], [0, 100] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

/**
 * Converts an RGB color value to Hexadecimal.
 * Assumes r, g, and b are contained in the set [0, 255].
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  String          The Hexadecimal representation (e.g., "RRGGBB")
 */
function rgbToHex(r, g, b) {
  function toHex(c) {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
  return toHex(r) + toHex(g) + toHex(b);
}

/**
 * Converts a Hexadecimal color value to RGB.
 * Assumes hex is a 3-digit or 6-digit string (without #).
 * @param   String  hex     The Hexadecimal color value (e.g., "RRGGBB" or "RGB")
 * @return  Array           The RGB representation
 */
function hexToRgb(hex) {
  let r = 0, g = 0, b = 0;

  // Handle 3-digit hex (e.g., "F00")
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  }
  // Handle 6-digit hex (e.g., "FF0000")
  else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  return [r, g, b];
}