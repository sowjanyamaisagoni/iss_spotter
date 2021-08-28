const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require("./iss");
const { nextISSTimesForMyLocation } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  fetchCoordsByIP(ip, (error, coordinates) => {
   if (error) {
     console.log("It didn't work!" , error);
     return;
   }

   console.log('It worked! Returned coordinates:' , coordinates);
 });
 fetchISSFlyOverTimes({ latitude: '43.7489', longitude: '-79.4422' }, (error, flyovers) => {
   if (error) {
     console.error(error);
     return;
   }

   console.log(flyovers);
 });
 nextISSTimesForMyLocation((error, passTimes) => {
   if (error) {
     return console.log("It didn't work!", error);
   }
   // success, print out the deets!
   console.log(passTimes);
 });
 console.log(flyovers);
}); 