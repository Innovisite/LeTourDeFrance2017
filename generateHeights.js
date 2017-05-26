var fs = require("fs");
var request = require("request");
var glob = require("glob");
var path = require("path");

var baseUrl = "http://cloudeffekt.codeffekt.com/heights/getHeights.php?ceapi=1cb6b626dcb5235ef40078c417090";

let files = glob.sync("build/etapes/etape*.json");

files.forEach((f) => {

    console.log("*** Process " + f);

    let outF = "build/etapes_heights/" + path.basename(f);

    if (fs.existsSync(outF)) {
        console.log("File " + f + " already processed...skip it");
        return;
    }

    fs.readFile(f, "utf8", (err, data) => {

        if (err) throw err;

        let obj = JSON.parse(data);

        let coordinates = obj.paths[0].points.coordinates;

        request({ uri: baseUrl, method: 'POST', json: { heights: coordinates } }, (err, httpResponse, body) => {

            if (err) throw err;            

            obj.paths[0].points.coordinates = body.heights;

            fs.writeFileSync(outF, JSON.stringify(obj));

        });

    });

});



