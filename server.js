var server = require('ferb');
var s = server();
var request = require("request");
var url = require('url');

s.get('/search', function(req, res) {
    //console.log('It works')
    var queryObject = url.parse(req.url, true).query;
    //console.log(queryObject);

    request('https://api.500px.com/v1/photos/search?consumer_key=0hOeFTYiG7RifmC07gLhd8iaSbXHjEBC9vDftgX4' + '&tag=' +
        queryObject.q, function(error, response, body) {
            var images = JSON.parse(body);
            var imageArray = []
            for (i = 0; i < images.photos.length; i++) {
                //console.log(images.photos[i].image_url);
                imageArray.push(images.photos[i].image_url);
            }
            res.send(imageArray);
        });
});

s.get('/', function(req, res) {
    res.sendfile('index.html')
})

s.get('/style.css', function(req, res) {
    res.sendfile('style.css')
})

s.listen(3000);