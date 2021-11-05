const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('24.202.79.138', (error, data) => {
//   if (error) {
//     console.log(`It didnt work: ${error}`);
//     return;
//   }
//   console.log(data);
// });

fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (err, data) => {
  if (err) {
    console.log(`It didnt work: ${err}`);
    return;
  }
  console.log(data);
});