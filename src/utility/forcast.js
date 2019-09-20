const request = require('request');


//Api Request to darlksky.nert for weather report data

module.exports = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/5237b6d4336fb91462163af0b0a52cbf/${latitude},${longitude}`;

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('unable to connect to the forecast services', undefined)
        }
        else if(body.error) {
            callback('unable to find the location', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 
            ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' degree with a low of ' 
            + body.daily.data[0].temperatureLow + ' degree. There is a ' + body.currently.precipProbability +
             '% chance of rain.')
        }
    });
}