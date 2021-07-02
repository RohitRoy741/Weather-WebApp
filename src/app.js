const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handle bars
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rohit'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rohit'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rohit',
        message: 'Watame did nothing wrong'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address to access the API'
        });
    }
    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} = {})=> {
        if(error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error,forecastData)=>{
            if(error) {
                return res.send({ error } );
            }
            res.send({
                address,
                location,
                forecast: forecastData 
            })
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "Please provide a search term!"
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Rohit',
        message: 'Help data not found!'
    });
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Rohit',
        message: 'Page not found!'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});