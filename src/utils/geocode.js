const request = require('request');

const geocode=(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRpdGh5YTEyMDkiLCJhIjoiY2s5Nm5oOHJjMGw1eTNlczB2eGt0dHFxMyJ9.xXW2KuMreXmkwjP03Dhv2w&limit=1';
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to map services',undefined);
        }
        else if(response.body.features.length === 0){
            callback('Unable to find locatiom!',undefined);
        }
        else{
            const data ={
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            }
            callback(undefined,data);
        }

    })
}

module.exports = geocode;
