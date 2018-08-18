import { models } from "mongoose";

const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/tweet');

const app = express()

module.exports = app => {

app.get('/tweet', (req, res) => {

    let desde = req.query.desde || 0;
        desde = Number(desde);
    let limite = req.query.limite || 5;
        limite = Number(limite);

        Tweet.find({ })
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

app.post('/tweet', (req, res) => {

    let body = req.body;

    let tweet = new Tweet({
        text: body.text
        })
    });

app.put('/tweet/:id', function (req, res) {
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

app.delete('/usuario/:id', function (req, res) {
    
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