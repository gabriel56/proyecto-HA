require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
//require('./login');

const express = __webpack_require__(1);
const mongoose = __webpack_require__(0);
const routes = __webpack_require__(7);

const app = express();

routes(app);

process.env.PORT = process.env.PORT || 8083;

process.env.URLDB = 'mongodb://localhost:27017/tweet';

// mongoose.connect('mongodb://localhost/tweet');

// mongoose.connection
//     .once('open', () => console.log('Conexión con la base de datos establecida!'))
//     .on('error', error => console.log(error));
mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) throw err;

  console.log('base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
  console.log('escuchando en puerto:', process.env.PORT);
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

process.env.PORT = process.env.PORT || 8083;

process.env.URLDB = 'mongodb://localhost:27017/tweet';

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(1);

// app.use( require('./users'));
// app.use( require('./tweets/tweet.js'));

const users = __webpack_require__(8);
const tweets = __webpack_require__(11);

module.exports = app => {
    users(app);
    tweets(app);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(0);

const bcrypt = __webpack_require__(2);
const jwt = __webpack_require__(9);
const bodyParser = __webpack_require__(3);
const User = __webpack_require__(10);

const saltRounds = 10;

const jsonParser = bodyParser.json();

module.exports = app => {

    app.get('/users', function (req, res) {
        let desde = req.query.desde || 0;
        desde = Number(desde);
        let limite = req.query.limite || 5;
        limite = Number(limite);

        User.find({}).skip(desde).limit(limite).exec((err, usuarios) => {
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
        });
    });

    app.post('/users', jsonParser, function (req, res) {

        let body = req.body;
        console.log(body);

        let user = new User({
            username: body.username,
            email: body.email,
            password: bcrypt.hashSync(body.password, saltRounds)
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
        let body = req.body;

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
            });
        });
    });
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(0);

let Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }

});

module.exports = mongoose.model('User', userSchema);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

//import { models } from "mongoose";
const mongoose = __webpack_require__(0);
const bcrypt = __webpack_require__(2);
const bodyParser = __webpack_require__(3);

const Tweet = __webpack_require__(12);

const jsonParser = bodyParser.json();

module.exports = app => {

    app.get('/tweets', (req, res) => {

        let desde = req.query.desde || 0;
        desde = Number(desde);
        let limite = req.query.limite || 5;
        limite = Number(limite);

        Tweet.find({}).or([{ text: req.query.search }, { author: req.query.search }]).skip(desde).limit(limite).exec((err, tweets) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                tweets
            });
        });
    });

    app.post('/tweets', jsonParser, (req, res) => {

        let body = req.body;

        let tweet = new Tweet({
            text: body.text
        });

        tweet.save((err, tweetDB) => {

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

        let cambiaEstado = { estado: false };

        //Tweet.findByIdAndRemove(id, (err, TweetBorrado) =>{
        Tweet.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, tweetBorrado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if (!tweetBorrado) {
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
            });
        });
    });
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(0);
const ObjectId = mongoose.Schema.Types.ObjectId;
let Schema = mongoose.Schema;

let tweetSchema = new mongoose.Schema({
    text: {
        type: String
    },

    author: ObjectId
});

module.exports = mongoose.model('Tweet', tweetSchema);

/***/ })
/******/ ]);
//# sourceMappingURL=main.map