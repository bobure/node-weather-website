const request = require('request')


const forecast = (latitude, longitude, callback) => {    
    const url = 'https://api.darksky.net/forecast/4d41792b5dd410c5f0225d97cc556302/' + latitude +',' + longitude +'?units=us'
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the geoCoding service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                dailySummary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                precipType: body.currently.precipType,
                humidity: body.currently.humidity,
                temperatureHigh: body.currently.temperatureHigh,
                temperatureLow: body.currently.temperatureLow,
                visibility: body.currently.visibility
            })      
        }
    })
}




module.exports = forecast