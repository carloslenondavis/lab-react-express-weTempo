import express from 'express';
import * as Batuta from './../services/batuta';
import * as Weather from './../services/weather';

const Endpoints = express();

Endpoints.get('/api/zone/countries/all', (req, res) => {     
    Batuta.allCountries()
        .then((countries)=> {           
            res.json(countries);
        })
        .catch((err) => {
            res.json(err)
        });
});

Endpoints.post('/api/zone/countries/all/name', (req, res) => {
    let name = req.body.countryName;
    Batuta.countriesByName(name)
        .then((countries)=> {
            res.json(countries);
        })
        .catch((err) => {
            res.json(err)
        });
});

Endpoints.post('/api/zone/weather/city/name', (req, res) => {
    let name = req.body.cityName;
    Weather.weatherByCityName(name)
        .then((weather)=> {            
            res.json(weather);
        })
        .catch((err) => {
            res.status(err.statusCode).json(err.error);
        });
});

export default Endpoints;