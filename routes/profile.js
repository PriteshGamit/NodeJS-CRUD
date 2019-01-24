var express = require('express');
var router = express.Router();

//connection
var Mongooes=require('mongoose');

var profiledata = require('../models/profieschems');
/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log("Hello");
  res.send("Profile Page Call");
});

//Insert Data
router.post('/insert', function (req, res, next) {
  var profile1 = new profiledata({
    name: req.body.name,
    address: req.body.address,
    indian: req.body.indian,
    hobbies: req.body.hobbies,
    dob: req.body.dob,
    vehicalno: req.body.vehicalno,

  });
  profile1.save().then(function (result) {
    res.status(200).json({
      docs: [profile1]
    });
  }).catch(function (error) {
    console.log(error)
  });
});

//GetData
router.get('/list', function (req, res, next) {
  profiledata.find({}).then((docs) => {
    res.status(200).json({
      docs
    })
  }).catch(error => {
    console.log(error)
  });
});

//DeleteData
router.delete('/delete/:id', function (req, res, next) {

  const pid = req.params.id;
  profiledata.findOneAndRemove(pid, (err, docs) => {
    if (err) {
      res.status(500).send(err);
    }
    const responese = {
      _id: pid
    };
    res.status(200).send(responese);
  });
});


//Update Data
router.put('/update/:id', function (req, res, next) {
  const condition = {_id: req.params.id};

  profiledata.findByIdAndUpdate(req.params.id, {$set: req.body,}).then((docs) => {
    if (!docs) {
      res.status(404).send().end();
    } else {
      docs.updated = Date.now();
      res.status(200).json(docs);
    }
  }).catch(error => {
    console.log(error);
  });
});

module.exports = router;