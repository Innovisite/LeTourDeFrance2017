var fs = require("fs");

fs.readFile(__dirname + "/TourDeFrance2017_template.czml", "utf8", function (err, data) {

    if (err) throw err;

    let czmlDoc = JSON.parse(data);

    czmlDoc.map((elt, idx) => {

        if (idx === 0) {
            return elt;
        }

        let czmlEtape = elt;

        let data = fs.readFileSync(__dirname + "/" + czmlEtape.properties.geojson, "utf8");

        let obj = JSON.parse(data);

        let coordinates = obj.paths[0].points.coordinates;

        var positions = [];

        coordinates.forEach((xyz) => {
            positions = positions.concat(xyz);
        });

        czmlEtape.polyline.positions = { "cartographicDegrees": positions };

        return czmlEtape;

    });

    console.log(JSON.stringify(czmlDoc));
});
