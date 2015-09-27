var fs = require('fs');
var root = './content/post';

var json = [];

var buildJson = function (file, done) {
    fs.readFile(root + '/' + file, function (err, context) {
        if (err) throw err;
        context = context.toString();
        var title = context.match(/title\s?\=\s?"(.*)"/)[1];
        var href = '/' + context.match(/url\s?\=\s?"(.*)"/)[1].replace(/\s/g,"-").toLowerCase();
        var tags = context.match(/tags\s?=\s?\[(.*)\]/);
        tags = (tags ? tags[1].match(/([0-9a-zA-Z\-\+\.]+\s?[0-9a-zA-Z\-\+\.]+)/g) : '');
        json.push({
            title: title,
            href: href,
            tags: tags
        });
        done();
    });
};

fs.readdir(root, function (err, files) {
    var counter = 0;
    for (var i in files) {
        buildJson(files[i], function () {
            counter++;
            if (counter == files.length) {
                fs.writeFile('./src/contants/posts.json', JSON.stringify(json), function (err) {
                    if (err) throw err;
                });
            }
        });
    }
});
