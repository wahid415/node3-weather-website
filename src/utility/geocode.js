const request = require('request');


module.exports = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1Ijoid2FoaWQ0MTUiLCJhIjoiY2p6ejZldDFpMXBidzNsdXQ1bXNnZjFxdCJ9.gpkhky78r6W0R0UtNVwtiw`;

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('unable to connect to the location services..', undefined)
        }
        else if(body.features.length === 0) {
            callback('unable to find the location ..try again', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
                
            })
        }
    })
}
