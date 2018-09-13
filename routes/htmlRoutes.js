var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/dashboard", function(req, res) {
    db.TODO.findAll({}).then(function(dbTODO) {
      console.log(dbTODO);
      res.render("dashboard", {
        todos: dbTODO
      });
    });
  });

  app.get("/", function(req, res) {
    db.TODO.findAll({}).then(function(dbTODO) {
      console.log(dbTODO);
      res.render("index", {
        todos: dbTODO
      });
    });
  });

  app.get("/create", function(req, res) {
    res.render("create");
  })
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
