const express = require('express')
const path = require('path')
const hbs = require('hbs')
const lodash = require('lodash')
const geocode = require('./utility/geocode')
const forcast = require('./utility/forcast')

const app = express();

const port = process.env.PORT || 3000

// Define pathn for Express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

// Setup  for handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialpath)

// Setup for static directory to serve
app.use(express.static(publicDirectorypath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Md Wahid Ali'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Md Wahid Ali'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text...',
        title: 'Help',
        name: 'Md Wahid Ali'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({ error: 'You must provide an address..' })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forcast(latitude, longitude, (error, forcastData) => {
            if(error) {
                return res.send({ error })
            }
            
            return res.send({
                forcast: forcastData,
                location,
                address: req.query.address,
            })
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Md Wahid Ali',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Md Wahid Ali',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log(`Application is up running on ${port} port`)
})