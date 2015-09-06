var path = require('path');
var fs = require('fs');


function collectExampleSource() {
    var baseDir = path.join(__dirname, 'examples', 'components', 'examples');
    var files = fs.readdirSync(baseDir);
    var result = {};

    files.forEach(function (fileName) {
        if (/\.jsx?$/.test(fileName)) {
            result[fileName.replace(/\.jsx?$/, '')] = fs.readFileSync(path.join(baseDir, fileName), {encoding: 'utf-8'});
        }
    });

    return result;
}

module.exports = collectExampleSource;
