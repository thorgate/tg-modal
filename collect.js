var path = require('path');
var fs = require('fs');


/**
 * Takes a source file, and does some replacements to
 *  make the code examples be more useful
 *
 * @param  {string} contents Original file contents
 * @return {string}          Modified file contents
 */
function transformFile(contents) {
    // Show prettier import paths
    contents = contents.replace('../../../src/browser', 'tg-modal');

    return contents;
}

/**
 * Collect all files from examples/components/examples and
 * return them as {fName: "Modified source", ...}.
 *
 * This is used to automatically generate `view code` values
 *  when rendering the examples page.
 *
 * @return {Object} Example files as {fName: "Modified source", ...}.
 */
function collectExampleSource() {
    var baseDir = path.join(__dirname, 'examples', 'components', 'examples');
    var files = fs.readdirSync(baseDir);
    var result = {};

    files.forEach(function (fileName) {
        if (/\.jsx?$/.test(fileName)) {
            result[fileName.replace(/\.jsx?$/, '')] = transformFile(fs.readFileSync(path.join(baseDir, fileName), {encoding: 'utf-8'}));
        }
    });

    return result;
}

module.exports = collectExampleSource;
