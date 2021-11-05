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





module.exports = { fetchMyIP, fetchCoordsByIP };