/* eslint-disable node/no-unsupported-features/es-syntax */
var express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const session = require('express-session');
const Superuser = require('../models/superuser');
const User = require('../models/users');
const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');
const webSocket = require("../websocket/web3");
const Kyc = require('../models/kyc');
const Amazon = require('../models/amazon');
const conf = require('../config');
const Request = require('request');
var app = express();
app.use(session({
  secret: 'z4z3l2cj2334234ghfj3uy4brfu384f83hf844uif8',
  saveUnintialized: true,
  resave: true
}));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/api/login",  (req, res) => {

  if(!req.body) return res.sendStatus(400);

  const {username, password} = req.body;
  console.log(username);

  Superuser.findOne({
    username
  },  (err, doc) => {
    if(err){
      res.sendStatus(400);
    }
    if(doc) {
      doc.comparePassword(password, doc.password,  (err, isMatch) => {
        if (err) res.sendStatus(400);
        if(!isMatch) {
          res.sendStatus(400);
        }else {
          res.json({
            success: true,
            message: 'login'
          });
          req.session.user = username;
          req.session.save();
        }
      })
    }else {
      res.sendStatus(400);
    }});
});

app.get("/api/logout", (req, res) => {
  req.session.user = undefined;
  req.session.save();
  res.json({
    success: false,
  });
});

app.get("/api/isloggedin", (req, res) => {
  res.json({
    status: !!req.session.user
  })
});

app.post("/api/changedata",  (req, res) => {

  if(!req.body) return res.sendStatus(400);

  const {_id, namedata, data} = req.body;
 // [{_id: 'role requared'}, {_id: 'ROLE_VERIFIED_USER'}]
  User.update({_id},{[namedata]:
      (namedata !== 'authorities') ? data: (data === 'ROLE_VERIFIED_USER') ?
        [{_id: "ROLE_USER"}, {_id: "ROLE_VERIFIED_USER"}] : [{_id: "ROLE_USER"}]
  },  (err, doc) => {
    if (err){
      return res.sendStatus(400);
    }
    res.json({
      status: true
    });
  });
});



app.post("/api/changekycstate",  (req, res) => {

  if(!req.body) return res.sendStatus(400);

  const {_id, kyc_state} = req.body;

  User.update({_id},{kyc_state:kyc_state, authorities:[{_id: "ROLE_USER"}, {_id: "ROLE_VERIFIED_USER"}]},
    (err, doc) => {
      if (err){
        return res.sendStatus(400);
      }
      res.json({
        status: true
      });
    });
});


app.post("/api/declinekyc",  (request, response) => {

  if(!request.body) return response.sendStatus(400);

  const {_id, kyc_state} = request.body;


  Request.post({ headers: {'content-type' : 'application/json'}
    , url: '?' }
, function(error, response, body){
    console.log(body);
  });

  /*User.updateOne({_id},{kyc_state:kyc_state},
    (err, doc) => {
      if (err){
        return res.sendStatus(400);
      }
      res.json({
        status: true
      });
    });*/
});

app.post("/api/useremail",  (req, res) => {

  if(!req.body) return res.sendStatus(400);

  const {email, password} = req.body;
  // [{_id: 'role requared'}, {_id: 'ROLE_VERIFIED_USER'}]
  webSocket.sendNewuser(email, password);
  res.send(email);
});

app.get("/api/walletadresses", (req, res) => {
  const {email} = req.query;
  Wallet.findOne({
    created_by: email
  },  (err, doc) => {
    if(err){
      res.sendStatus(400);
    }
    res.send(doc);
  })
});

app.post("/api/walletadresses", (req, res) => {
  const {email, ethereum_address, nem_address} = req.body;
  console.log(email, ethereum_address, nem_address);

  Wallet.updateOne({created_by: email}, (ethereum_address && nem_address)? {ethereum_address:ethereum_address,
    nem_address: nem_address }: (ethereum_address)? {ethereum_address: ethereum_address}:
    (nem_address)?{nem_address: nem_address}: null,  (err, doc) => {
    if (err){
      return res.sendStatus(400);
    }
    res.json({
      status: true
    });
  });
});

app.get("/api/userdata", (req, res) => {
  User.find({}, {password: 0},(err, doc) => {
    if(err){
      res.sendStatus(400);
    }
     res.send(doc);
  }).sort({ $natural: -1 });
});


app.get("/api/kyc", (req, res) => {
  Kyc.find({},(err, doc) => {
    if(err){
      res.sendStatus(400);
    }
    res.send(doc);
  }).sort({ $natural: -1 });
});


app.get("/api/transactions", (req, res) => {
  Transaction.find({}, {_id: 0},(err, doc) => {
    if(err){
      res.sendStatus(400);
    }
    res.send(doc);
  });
});


// download the file via aws s3 here
app.get('/api/s3Proxy', async function(req, res){
  const {_id} = req.query;

   await Amazon.findOne({
      _id
     },  (err, doc) => {
       if(err) res.sendStatus(400);
     var fileKey = `${doc.directory}/${doc.key}`;

     console.log('Trying to download file', fileKey);
     var AWS = require('aws-sdk');
     AWS.config.update(
       {
         accessKeyId: conf.accessKeyId,
         secretAccessKey:conf.secretAccessKey,
         region: conf.region
       }
     );
     var s3 = new AWS.S3();
     var options = {
       Bucket    : doc.bucket,
       Key    : fileKey,
     };
     res.attachment(`${fileKey}.${doc.extension_file}`);
     var fileStream = s3.getObject(options).createReadStream();
     fileStream.pipe(res);
  });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});
module.exports = app;
