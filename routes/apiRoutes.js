var db = require("../models");
var account = "AC3852e5792427a7a7a0ebf9e4b2c42794";
var token = "c2621001c9999775b1256bb765868ce2";
var sms = require("twilio")(account, token);
var jwt = require("jsonwebtoken");

module.exports = function (app) {


  app.post("/api/todo", function (req, res) {
    db.TODO.create(req.body).then(function (dbTODO) {
      res.json(dbTODO);
    });
  });

  app.post("/api/detail/:id", function (req, res) {
    db.TODO.find({ where: { id: req.params.id } }).then(function (dbTODO) {
      var details = dbTODO.details
      sms.messages
        .create({
          body: details,
          from: "+16477234121",
          to: "+17783234201"
        }).then(function (message) {
          res.json(message)
        })
    })
  })

  app.delete("/api/todo/:id", function (req, res) {
    db.TODO.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/todo/:id", function (req, res) {
    console.log(req.body);
    db.TODO.update({
      completed: req.body.completed
    }, {
        where: {
          id: req.params.id
        }
      }).then(function (dbPost) {
        res.json(dbPost);

      });
  });

  app.post('/api/register', (req, res) => {
    db.Account.create(req.body).then(function (dbTODO) {
      res.json(dbTODO);
    });
  });

  app.post('/api/login', (req, res) => {

    db.Account.findOne({
      where: {
        username: req.body.username,

      }
    }).then(function (dbUser) {
      if (dbUser !== null) {
        var user = dbUser.username;
        console.log("user in api: " + user);

        jwt.sign({ user }, 'secretkey', { expiresIn: '30m' }, (err, token) => {
          // token+=("_"+dbUser.id);
          console.log("token: " + token);
          res.json({
            validate: true,
            message: 'Logged In',
            token: token
          });
        });
      } else {
        res.json({
          validate: false,
          message: 'User Name not found, Please try again'
        });
      }
    })
  })
  app.get('/api/auth', verifyToken, function (req, res) {
    console.log(req.headers);
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {

        res.sendStatus(200);
      };
    });
  });
};

function verifyToken(req, res, next) {

  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403);
  }
}