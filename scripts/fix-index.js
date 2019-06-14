const fs = require('fs');

const someFile = process.argv[2];

fs.readFile(someFile, 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }

    const result = data
    .replace("<!-- GH PAGES DEFAULT CSS -->", '<link href="default.css" rel="stylesheet" type="text/css" />')
    .replace("<!-- GH PAGES DEFAULT JS -->", '<script src="bundle.default.js" type="text/javascript"></script>');

    fs.writeFile(someFile, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});
