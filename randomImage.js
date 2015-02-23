var fs = require('fs');
var root = '/img/unsplash';

var curate = function (postPath, files, post) {
    fs.readFile(postPath + '/' + post, function (err, context) {
        if (err) throw err;
        var content = context.toString().replace(/img = \"(.*)\"/ig, function (tokens, p1, p2, p3) {
            return 'img = "/img/unsplash/' + files[Math.floor((Math.random() * (files.length - 1)))] + '"';
        });

        fs.writeFile(postPath + '/' + post, content, function (err) {
            if (err) throw err;
        });
    }); 
};



fs.readdir('./static/img/unsplash', function (err, files) {

    var postPath = './content/post';
    fs.readdir(postPath, function (err, posts) {

        for (var i in posts) {
            curate(postPath, files, posts[i]);
        }
    });
});