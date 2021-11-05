const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
		
    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};


const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, res, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (res.statusCode !== 200) {
      callback(Error(`Status Code ${res.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const latLon = {};
    latLon.latitude = JSON.stringify(JSON.parse(body).latitude);
    latLon.longitude = JSON.stringify(JSON.parse(body).longitude);
			
    callback(null, latLon);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = (coords, callback) => {
  const lat = coords.latitude;
  const lon = coords.longitude;
  request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (res.statusCode !== 200) {
      callback(Error(`Status Code ${res.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }


    const bodyObj = JSON.parse(body);
    callback(null, bodyObj.response);
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };