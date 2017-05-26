var fs = require("fs");
var request = require("request");

fs.readFile(__dirname + "/EtapesConfig.json", "utf8", function (err, data) {

    if (err) throw err;

    let obj = JSON.parse(data);

    let baseUrl = obj.api.url + "?" + obj.api.params;

    obj.etapes.forEach((etape) => {

        if (fs.existsSync(etape.output)) {
            console.log("File " + etape.output + " already exists skip it");
        } else {

            let url = baseUrl;

            etape.points.forEach((pt) => {
                url += "&point=" + pt[0] + "%2C" + pt[1];
            });

            request(url).pipe(fs.createWriteStream(etape.output));
        }
    });

});