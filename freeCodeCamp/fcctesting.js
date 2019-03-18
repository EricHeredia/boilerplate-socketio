/*
*
*
*
*
*
*
*
*
*
*
*
*       DO NOT EDIT THIS FILE
*       For FCC testing purposes!
*
*
*
*
*
*
*
*
*
*
*
*/

/*
*  THIS FILE IS FOR freeCodeCamp TO BE ABLE TO TEST YOUR CODE PROPERLY
*
*  ~DO NOT EDIT!~
*
*/


'use strict';

const fs = require('fs');
const cors = require('cors');

module.exports = function (app) {
  app.use(cors());
  
  app.use(function (req, res, next) {
      var allowedOrigins = ['https://pricey-hugger.gomix.me', 'http://pricey-hugger.gomix.me', 'https://freecodecamp.com', 'https://beta.freecodecamp.com', 'http://freecodecamp.com', 'http://beta.freecodecamp.com','http://localhost:3000', 'https://localhost:3000']
       var origin = req.headers.origin;
        if(allowedOrigins.indexOf(origin) > -1){
             res.setHeader('Access-Control-Allow-Origin', origin);
        }
      //res.setHeader('Access-Control-Allow-Origin', 'https://pricey-hugger.gomix.me');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
  });
  
  app.route('/_api/server.js')
    .get(function(req, res, next) {
      console.log('requested');
      fs.readFile(process.cwd() + '/server.js', function(err, data) {
        if(err) return next(err);
        res.send(data.toString());
      });
    });
    
  app.route('/_api/package.json')
    .get(function(req, res, next) {
      console.log('requested');
      fs.readFile(process.cwd() + '/package.json', function(err, data) {
        if(err) return next(err);
        res.type('txt').send(data.toString());
      });
    });

  app.get('/_api/app-info', function(req, res) {
    var hs = Object.keys(res._headers)
      .filter(h => !h.match(/^access-control-\w+/));
    var hObj = {};
    hs.forEach(h => {hObj[h] = res._headers[h]});
    delete res._headers['strict-transport-security'];
    res.json({headers: hObj});
  });
  
};
