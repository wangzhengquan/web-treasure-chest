const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const inputDir = path.join(__dirname, 'public/js');
const outputDir = path.join(__dirname, 'public/js');

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith('.js')) {
      const inputFile = path.join(inputDir, file);
      // Remove js suffix
      file = file.slice(0, '.js'.length * -1);
      console.log('file', file);
      const outputFile = path.join(outputDir, file + '.min.js');

      fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file: ${inputFile}`, err);
          return;
        }

        minify(data)
          .then((result) => {
            fs.writeFile(outputFile, result.code, (err) => {
              if (err) {
                console.error(`Error writing file: ${outputFile}`, err);
                return;
              }
              console.log(`Minified ${file}`);
            });
          })
          .catch((err) => {
            console.error(`Error minifying file: ${inputFile}`, err);
          });
      });
    }
  });
});
