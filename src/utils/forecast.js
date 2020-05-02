const request = require('request');
//const geocode = require('./geocode');

const forecast=(latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=fcb580ecce5a690cf6ea70a0322aa0e6&query='+latitude+','+longitude+'&units=m';
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services',undefined);
        }else if(body.error){
            callback('Unable to find the location',undefined);
        }else{
            const data = body
            const current_data = data.current;
            callback(undefined,current_data);
        }
    })

}

module.exports=forecast;