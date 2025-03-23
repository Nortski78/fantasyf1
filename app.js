#!/usr/bin/env node

import  express  from 'express';
import  mongoose  from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
import { F1Events } from './models/f1events.js';
import { Players } from './models/players.js';
import { Drivers } from './models/drivers.js';
import { Selections } from './models/selections.js';
import { Results } from './models/results.js';

//App
const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.DBURI;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Connect to database
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('Connected to database');
        app.listen(port, '0.0.0.0');
    })
    .catch((error) => console.log(error));

//Middleware
app.use(express.static('public'));

app.get('/', (req, res) => {

    res.render('index.ejs');
});
app.get('/admin', (req, res) => {

    res.render('admin.ejs');
});

app.get('/ping', (req, res) => {

    res.send('Pinged successfully');
});

app.use(express.urlencoded({extended: true}));

//routes
// Edit this to change event
app.get('/event-details', (req, res) => {
    F1Events.findOne({id: 3}, 'id event_name circuit event_start')
    .then((result) => {
        //console.log(result);
        res.send(result);
    })
    .catch((error) => console.log(error));
})

app.get('/events', (req, res) => {
    F1Events.find({}, 'id event_name circuit event_start').sort({id: 1})
    .then((result) => {
        //console.log(result);
        res.send(result);
    })
    .catch((error) => console.log(error));
})

app.get('/player-details', (req, res) => {
    Players.aggregate(
        [
            {'$lookup': {
                'from': "drivers",
                'localField': "driver_selection",
                'foreignField': "id",
                'as': "result",
                'pipeline': [{'$project': {'total_points': 1, 'driver_name': 1, '_id': 0}}]
            }},
            {'$set': {'driver_name': "'$result.driver_name'", 'driver_points': "$result.total_points"}},
            {'$project': {'id': 1, 'points': 1, 'player_name': 1, 'bonus': 1,'driver_details': {
              'driver_name': "$result.driver_name",
              'driver_points': "$result.total_points"
            } 
            }}
        ]
    )
    .sort({points: -1})
    .then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch((error) => console.log(error));
})

app.get('/update-player-points', (req, res) => {
    Players.aggregate([
        {
          '$lookup': {
            'from': 'drivers', 
            'localField': 'driver_selection', 
            'foreignField': 'id', 
            'as': 'result', 
            'pipeline': [
              {
                '$project': {
                  'total_points': 1, 
                  '_id': 0
                }
              }
            ]
          }
        },
        {'$set': {'points': {'$add': [{'$sum': "$result.total_points"}, {'$convert': {'input': '$bonus', 'to': "int", 'onError': 0, 'onNull': 0}}]}}},
        {'$project': {'points': 1}},
        {'$merge': {'into': "players"}}
    ]) 
    .then((result) => {
        console.log(result);
        res.send('Player points updated');
    })
    .catch((error) => {
        console.log(error);
    });
})

app.get('/driver-details', (req, res) => {
    Drivers.find({}, 'id driver_name').sort({driver_name: 1})
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    })
})

app.get('/player-details-one/:pin', (req, res) => {

    const pin = parseInt(req.params.pin);

    Players.findOne({'pin':  pin}, {'id': 1, 'player_name': 1, '_id': 0})
    .then((result) => {
        if(result === null) result = {id: null};
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    })
})

app.post('/insert-podium-selection', express.json(), (req, res) => {
    console.log(req.body);

    const update = {
        player_id: req.body.player_id,
        player_name: req.body.player_name,
        event_id: req.body.event_id,
        selections: [req.body.first, req.body.second, req.body.third]
    }

    Selections.findOneAndUpdate({'player_id': req.body.player_id, 'event_id': req.body.event_id}, update, {
        new: true,
        upsert: true
    })
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    })
})

app.post('/result', express.json(), (req, res) => {

    const update = {
        event_id: req.body.event_id,
        event_name: req.body.event_name,
        fastest_lap: req.body.fastest_lap,
        result: req.body.result
    }

    Results.findOneAndUpdate({'event_id': req.body.event_id}, update, {
        new: true,
        upsert: true
    })
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    })
})

app.post('/driver-points', express.json(), (req, res) => {

    let driverids = [];
    let raceResult = [];

    req.body.result.forEach((result) => {
        driverids.push(result.id);
        raceResult.push({
            id: result.id,
            event_id: result.event_id,
            event_name: result.event_name,
            points: result.points
        })
    })

    Drivers.updateMany({
        id: {
            $in: driverids
        }
    },
    [
        {
            $set: {
                results: {
                    $ifNull: [
                        "$results",
                        []
                    ]
                }
            }
        },
        {
            $set: {
                results: {
                    $concatArrays: [
                        "$results",
                        {
                            $filter: {
                                input: raceResult,
                                cond: {
                                    $eq: [
                                        "$$this.id",
                                        "$id"
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        },
        {
            $unset: "results.id"
        },
        {
            $set: {
                total_points: {
                    $sum: "$results.points"
                }
            }
        }
    ],
    {
        multi: true
    })    
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    })
})
