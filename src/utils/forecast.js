const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b21d30f5bcae38bbedabd9061897f94b&query=${latitude},${longitude}&units=m`;
    request({ url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to Weather api');
        } else if(body.error) {
            callback('Incorrect coordinates');
        } else {
            const data = body.current.weather_descriptions[0] +'\nIts currently ' +  body.current.temperature + ' degree celsius out and feels like ' + body.current.feelslike + '\nThere is ' + body.current.precip + '% chance of rain.\nThe visibility is ' + body.current.visibility +'.\nHumidity is ' + body.current.humidity ;
            callback(undefined, data);
        }
    })
}

module.exports = forecast 