var fs = require('fs');
var root = '/img/unsplash';
fs.readdir('./static/img/unsplash', function (err, files) {

    var postPath = './content/post';
    fs.readdir(postPath, function (err, posts) {

        for (var i in posts) {
            fs.readFile(postPath + '/' + posts[i], function (err, context) {
                if (err) throw err;
                var content = context.toString().replace(/img = \"(.*)\"/ig, function (tokens, p1, p2, p3) {
                    return "/img/unsplash/" + files[Math.floor((Math.random() * (files.length - 1)))];
                });

                fs.writeFile(postPath + '/' + posts[i], content, function (err) {
                    if (err) throw err;
                });
            });
        }
    });
});