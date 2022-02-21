const request = require("request");

const geoCode = (address, callback) => {
    const urlmapbox ="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoibXNhbmpheTA1IiwiYSI6ImNrenUzeTBpYjA5dWYyeGxrYmQzbHVlMnQifQ.vBvgd7JZzrXsHVpDXF_Ayw";
    request({ url: urlmapbox, json: true }, (error, {body}) => {
        if(error)
        {
            callback('unable to connect to location services');
        }
        else if(body.features.length===0)
        {
            callback('unable to find location, Try another search!');
        }
        else
        {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                place_name:body.features[0].place_name,
            })
        }
    });
  }

module.exports={
    geoCode:geoCode
}