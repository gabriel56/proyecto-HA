//import { models } from "mongoose";
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const Tweet = require('../../models/tweet');

const jsonParser = bodyParser.json();


module.exports = app => {

app.get('/tweets',  (req, res) => {

    let desde = req.query.desde || 0;
        desde = Number(desde);
    let limite = req.query.limite || 5;
        limite = Number(limite);
   
        Tweet.find({ })
        .or([{ text: req.query.search },{ author: req.query.search} ])
        .skip(desde)
        .limit(limite)
        .exec( (err, tweets) => {
          if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
            res.json({
              ok:true,
              tweets
            });
        })
    });

app.post('/tweets', jsonParser, (req, res) => {

    let body = req.body;

    let tweet = new Tweet({
        text: body.text
        })

        tweet.save ((err, tweetDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                tweet: tweetDB
            });
        });
    });

app.put('/tweets/:id', jsonParser, function (req, res) {
    let id = req.params.id;
    let body = req.body;
    
    Tweet.findByIdAndUpdate(id, body, (err, tweetDB) => {

        if (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
    res.json({
        ok: true,
        tweet: tweetDB
        });
    
    });
});

app.delete('/tweets/:id', function (req, res) {
    
    let id = req.params.id;

    let cambiaEstado = { estado: false};
    
    //Tweet.findByIdAndRemove(id, (err, TweetBorrado) =>{
    Tweet.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, tweetBorrado) =>{

    if (err) {
        return res.status(400).json({
          ok: false,
          err
      });
    }
      if(!tweetBorrado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'El tweet no existe'
          }
});
    }
    res.json({
      ok: true,
      estado: tweetBorrado
        })
    })
});

};