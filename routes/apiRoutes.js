var db = require("../models");
var account = "AC3852e5792427a7a7a0ebf9e4b2c42794";
var token = "c2621001c9999775b1256bb765868ce2";
var sms = require("twilio")(account, token);
module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  //  Create a new example
  app.post("/api/todo", function (req, res) {
    db.TODO.create(req.body).then(function (dbTODO) {
      res.json(dbTODO);
    });
  });

  app.post("/api/detail/:id", function (req, res) {
    db.TODO.find({ where: { id: req.params.id } }).then(function (dbTODO) {
      var details=dbTODO.details
      sms.messages
      .create({
        body: details,
        from: "+16477234121",
        to: "+17783234201"
      }).then(function(message){
        res.json(message)
      })
    })
  })

  // Delete an example by id
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
};
