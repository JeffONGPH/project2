var db = require("../models");

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
