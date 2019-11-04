// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  let dateStr = req.params.date_string;
  let unixResult; //'1572886800000'
  let utcResult; // 'Mon, 04 Nov 2019 17:00:00 GMT'
  let result;

  if (dateStr) {
    dateStr = Number(dateStr) ? +dateStr : dateStr;

    unixResult = new Date(dateStr).getTime();
    let date = new Date(dateStr);
    utcResult = date.toUTCString();
  } else {
    unixResult = Date.now();
    utcResult = new Date(Date.now()).toUTCString();
  }

  if (!unixResult) {
    result = { error: "Invalid Date" };
  } else {
    result = {
      unix: unixResult,
      utc: utcResult
    };
  }
  res.json(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
