const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};
const fetchCoordsByIP = function (ip, callback) {
   request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
 
     if (error) { // print error if not null
       callback(`error: ${error}`, null); // error/null for desc
       return;
     }
 
     if (response.statusCode !== 200) { // print status code if not successful
       const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
       callback(Error(msg), null);
       return;
     }
 
     const { latitude, longitude } = JSON.parse(body);
 
     callback(null, { latitude, longitude });
   });
 
 }
 const fetchISSFlyOverTimes = (coords, callback) => {
   const { latitude, longitude } = coords;
   const uri = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
 
   request.get(uri, {}, (error, response, body) => {
     if (error) {
       callback(error, null);
       return;
     }
 
     if (response.statusCode !== 200) {
       const msg = `Status Code ${response.statusCode} when fetching ISS flyover. Response: ${body}`;
       callback(Error(msg), null);
       return;
     }
 
     const data = JSON.parse(body);
     const flyovers = data["response"];
 
     callback(null, flyovers);
   });
 };
 
 
 const nextISSTimesForMyLocation = callback => {
   fetchMyIP((error, ip) => {
     if (error) {
       callback(error, null);
       return;
     }
 
     fetchCoordsByIP(ip, (error, coords) => {
       if (error) {
         callback(error, null);
         return;
       }
 
       fetchISSFlyOverTimes(coords, (error, flyovers) => {
         if (error) {
           callback(error, null);
           return;
         }
 
         callback(null, flyovers);
       });
     });
   });
 }
 
 module.exports = {
   fetchMyIP,
   fetchCoordsByIP,
   fetchISSFlyOverTimes,
   nextISSTimesForMyLocation
 };