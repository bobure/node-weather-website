// nodemon src/app.js -e js,hbs

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// express config
const port = 3000
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// Setup handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirPath, {
    extensions: ['htm', 'html'],
    index: 'index.html'
}))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Valle'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Valle'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Valle'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide a location' 
        })
    }
    
    geoCode(req.query.location, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Valle',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {    
    res.render('404', {
        title: '404',
        name: 'Valle',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server listening on port: ', port)
})