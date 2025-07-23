import Script from 'next/script';
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const code = `
    var ArrayUtil = {};

    ArrayUtil.isArray = function (val) {
        if (!val) {
            return false;
        }
        return Object.prototype.toString.call(val) === '[object Array]';
    };

    ArrayUtil.toArray = function (obj, offset) {
        return Array.prototype.slice.call(obj, offset || 0);
    };

    ArrayUtil.each = function (obj, fn) {
        if (ArrayUtil.isArray(obj)) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (fn.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (fn.call(obj[key], obj[key], key) === false) {
                        break;
                    }
                }
            }
        }
    };

    ArrayUtil.inArray = function (arr, val) {
        for (let i = 0, len = arr.length; i < len; i++) {
            if (val === arr[i]) {
                return i;
            }
        }
        return -1;
    }

    ArrayUtil.unique = function (arr) {
        var unique = [];
        for (let i = 0; i < arr.length; i++) {
            if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
        }
        return unique;
    };
`;

export default async function ArrayUtil({}) {
  // const inputFile = path.resolve(__dirname, './test.js');
  const result = await minify(code);
  return <Script id="array-util-script">{result.code}</Script>;
}
