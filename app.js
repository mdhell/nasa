var express = require("express"),
    app     = express(),
    request = require("request");
    bodyParser = require('body-parser');
     timeout = require('connect-timeout');
    
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res) {
    res.render("search");
});
    
// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }
 
//     var $ = require("jquery")(window);
// });

// 
app.get("/results", function(req, res) {
    //console.log(req.query.start);
    var startDate = req.query.start;
    var endDate   = req.query.end;
    // var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY";
    var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + startDate + "&end_date=" + startDate + "&api_key=5LtjDvkS64nPQYbfPudOl8szw8gwT9Z03i4ScysJ";
    // var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2016-09-07&end_date=2016-09-08&api_key=98OtiAcpdjH97wT43K81GrWDll5iz3hmEpMVWAYX";
    request(url, function(err, response, body) {
    if(!err && response.statusCode == 200) {
            var data = JSON.parse(body);
            
            // var data = JSON.parse(body);
            res.render("results", {data: data, startDate: startDate, endDate: endDate});
            
            // for (var neo in data.near_earth_objects) {
            //neo is now, for instance, "2016-09-07"
            //     for (var name in data.near_earth_objects[neo]) {
            //         console.log(name, data.near_earth_objects[neo][name]);
            //     }
            // console.log(neo, data.near_earth_objects[neo])}
            // res.sendStatus(data);
            // res.sendStatus(data.element_count);
            // console.log(req.query.page);
            // console.log(body);
            // res.render("results", {data: data});
    } else {
        console.log("Sorry, there was some type of error...");
    }
    });
// });
});

// begin timeout
// var app = express()
// app.post('/save', timeout('5s'), bodyParser.json(), haltOnTimedout, function (req, res, next) {
//   savePost(req.body, function (err, id) {
//     if (err) return next(err)
//     if (req.timedout) return
//     res.send('saved as id ' + id)
//   })
// })
 
// function haltOnTimedout (req, res, next) {
//   if (!req.timedout) next()
// }
 
// function savePost (post, cb) {
//   setTimeout(function () {
//     cb(null, ((Math.random() * 40000) >>> 0))
//   }, (Math.random() * 7000) >>> 0)
// }
// end timeout

app.use(timeout('15s'))

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("NEO API server is up!");
})