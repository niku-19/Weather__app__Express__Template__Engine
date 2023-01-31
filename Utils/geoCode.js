const request = require("postman-request");

const geoCode = (address, callback) => {
  const URL_LOCATION = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmlrdTE5bmlrdTk5IiwiYSI6ImNsZGFpOGZ3MDBnMHMzbm5weGF3bXQ0a2UifQ.TG2yL2lbp6B-Bbgmcv_D2A`;
  request(
    {
      url: URL_LOCATION,
      json: true,
    },
    (error, {body}) => {
      if (error) {
        callback("Unable to connect to location service!", undefined);
      } else if (body.features.length === 0) {
        callback("Unable to find location. Try another search", undefined);
      } else {
        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0];
        callback(undefined, {
          latitude,
          longitude,
          location: body.features[0].place_name,
        });
      }
    }
  );
};

module.exports = geoCode;
