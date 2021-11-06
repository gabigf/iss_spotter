const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = passTimes => {
  for (let passTime of passTimes) {
    let date = new Date(0);
    date.setUTCSeconds(passTime.risetime);
    console.log(`Next pass at ${date} for ${passTime.duration} seconds!`);
  }
};


nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
	.catch(error => {
		console.log(`It didn't work: ${error.message}`);
	});
