const request = require('request-promise-native');


const fetchMyIP = () => {
	return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
	const ip = JSON.parse(body).ip;
	return request(`https://freegeoip.app/json/${ip}`);
}

const fetchISSFlyOverTimes = coords => {
	const { latitude, longitude } = JSON.parse(coords);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

// console.log(fetchISSFlyOverTimes(fetchCoordsByIP()))

module.exports = { nextISSTimesForMyLocation }