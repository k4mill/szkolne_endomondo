var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var session = require('expr`ess-session');
var models = require('../models');
var Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db.config.js');
const Users = db.users;
 
 
exports.login = (req, res) => {
    Users.findOne({
        where: { ID: req.query.id },
        include: [{all: true, nested: true}]
      })
      .then(aktywnosc => {
        res.json(aktywnosc);
      })
      .catch(error => {
        res.status(500).send(error);
      })
  };

exports.register = (req, res) => {

}