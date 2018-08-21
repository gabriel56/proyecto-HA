const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('../../models/user.js');

const saltRounds = 10;


const jsonParser = bodyParser.json();

module.exports = app => {

    app.get('/users', function (req, res) {
        let desde = req.query.desde || 0;
        desde = Number(desde);
        let limite = req.query.limite || 5;
        limite = Number(limite);
       


        User.find({})
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    usuarios
                });
            })
    })

    app.post('/users', jsonParser, function (req, res) {

        let body = req.body;
        console.log(body);

        let user = new User({
            username: body.username,
            email: body.email,
            password: bcrypt.hashSync(body.password, saltRounds),
        });

        user.save((err, userDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuario: userDB
            });
        });
   });
    
    app.put('/users/:id', jsonParser, function (req, res) {
        let id = req.params.id;
        let body = (req.body);

        User.findByIdAndUpdate(id, body, (err, userDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuario: userDB
            });

        });
    });

    app.delete('/users/:id', function (req, res) {

        let id = req.params.id;

        let cambiaEstado = {
            estado: false
        };

        //user.findByIdAndRemove(id, (err, userBorrado) =>{
        User.findByIdAndUpdate(id, cambiaEstado, {
            new: true
        }, (err, userBorrado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if (!userBorrado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El usuario no existe'
                    }
                });
            }
            res.json({
                ok: true,
                estado: userBorrado
            })
        })
    });

};