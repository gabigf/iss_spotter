const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = passTimes => {
  for (let passTime of passTimes) {
    let date = new Date(0);
    date.setUTCSeconds(passTime.risetime);
    console.log(`Next pass at ${date} for ${passTime.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});