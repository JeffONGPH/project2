var db = require("../models");
var DecisionTree = require('decision-tree');


module.exports = function (app) {
  // Load index page
  app.get("/dashboard", function (req, res) {
    db.TODO.findAll({}).then(function (dbTODO) {
      var training_data = [
        { "category": 0, "difficulty": 10, "name": "Mow The Lawn" },
        { "category": 0, "difficulty": 8, "name": "Take Garbage To The Curb" },
        { "category": 0, "difficulty": 10, "name": "Shovel Driveway" },
        { "category": 0, "difficulty": 5, "name": "Wash Dishes" },
        { "category": 0, "difficulty": 6, "name": "Vacuum Floors" },
        { "category": 0, "difficulty": 6, "name": "Mop Floors" },
        { "category": 0, "difficulty": 7, "name": "Clean Bathroom" },
        { "category": 0, "difficulty": 7, "name": "Clean Kitchen" },
        { "category": 0, "difficulty": 3, "name": "Check Mail" },
        { "category": 0, "difficulty": 2, "name": "Pay Bills" },
        { "category": 0, "difficulty": 3, "name": "Change Light Bulb" },
        { "category": 0, "difficulty": 2, "name": "Make Fresh Coffee" },
        { "category": 0, "difficulty": 8, "name": "Water The Lawn" },
        { "category": 0, "difficulty": 4, "name": "Wash Dishes" },
        { "category": 0, "difficulty": 5, "name": "Do Laundry" },
        { "category": 0, "difficulty": 2, "name": "Organize Clothes" },
        { "category": 0, "difficulty": 3, "name": "Dust Surfaces" },
        { "category": 0, "difficulty": 1, "name": "Feed Pets" },
        { "category": 0, "difficulty": 7, "name": "Organize Fridge" },
        { "category": 0, "difficulty": 2, "name": "Make Bed" },
        { "category": 1, "difficulty": 7, "name": "Create Plan" },
        { "category": 1, "difficulty": 6, "name": "Meet Partners" },
        { "category": 1, "difficulty": 7, "name": "Create A Budget" },
        { "category": 1, "difficulty": 10, "name": "Get A Business Loan" },
        { "category": 1, "difficulty": 10, "name": "Search For Investors" },
        { "category": 1, "difficulty": 8, "name": "Work On Marketing" },
        { "category": 1, "difficulty": 9, "name": "Hire And Employee" },
        { "category": 1, "difficulty": 6, "name": "Build Website" },
        { "category": 1, "difficulty": 7, "name": "Create Business Cards" },
        { "category": 1, "difficulty": 5, "name": "Generate Leads" },
        { "category": 1, "difficulty": 3, "name": "Set Deadlines" },
        { "category": 1, "difficulty": 4, "name": "Create Payroll" },
        { "category": 1, "difficulty": 6, "name": "Pay Vendors" },
        { "category": 1, "difficulty": 7, "name": "Maintain Office Equipment" },
        { "category": 1, "difficulty": 8, "name": "Rent Office Space" },
        { "category": 1, "difficulty": 4, "name": "Find An Accountant" },
        { "category": 1, "difficulty": 2, "name": "Open A Business Bank Account" },
        { "category": 1, "difficulty": 2, "name": "Buy Desk Phones" },
        { "category": 1, "difficulty": 1, "name": "Buy An Internet Plan" },
        { "category": 1, "difficulty": 3, "name": "Buy Mobile Phones" },
        { "category": 2, "difficulty": 6, "name": "Buy Groceries" },
        { "category": 2, "difficulty": 5, "name": "Buy Gas" },
        { "category": 2, "difficulty": 8, "name": "Book Vacation" },
        { "category": 2, "difficulty": 6, "name": "Write A Letter" },
        { "category": 2, "difficulty": 3, "name": "Check E-Mail" },
        { "category": 2, "difficulty": 7, "name": "Work On Goals" },
        { "category": 2, "difficulty": 8, "name": "Repair Car" },
        { "category": 2, "difficulty": 1, "name": "Call Mom" },
        { "category": 2, "difficulty": 3, "name": "Enroll In A Class" },
        { "category": 2, "difficulty": 4, "name": "Go To The Gym" },
        { "category": 2, "difficulty": 8, "name": "Cook Dinner" },
        { "category": 2, "difficulty": 1, "name": "Watch A Movie" },
        { "category": 2, "difficulty": 3, "name": "Buy Tickets" },
        { "category": 2, "difficulty": 2, "name": "Wake Up" },
        { "category": 2, "difficulty": 1, "name": "Wash Hands Regularly" },
        { "category": 2, "difficulty": 6, "name": "Eat More Vegetables" },
        { "category": 2, "difficulty": 7, "name": "Read A Book" },
        { "category": 2, "difficulty": 10, "name": "Work On Posture" },
        { "category": 2, "difficulty": 6, "name": "Be Positive" },
        { "category": 2, "difficulty": 8, "name": "Create A Schedule" },
      ];

      var class_name = "name";

      var features = ["category", "difficulty"];

      var dt = new DecisionTree(training_data, class_name, features);

      var recom = new Array();
      var tempJ = JSON.stringify(dbTODO);
      for (var i = 0; i < dbTODO.length; i++) {
        
        var category;
        if (dbTODO[i].category == 'Household') { category = 0 }
        else if (dbTODO[i].category == 'Business') {
          category = 1
        }
        else if (dbTODO[i].category == 'Personal') {
          category = 2
        }
        var predicted_class = {
          id: i+1,
          name: dt.predict({
            category: category,
            difficulty: dbTODO[i].difficulty
          }),
          category: dbTODO[i].category
        };
        recom.push(predicted_class);
      }
      console.log(recom);
      res.render("dashboard", {
        todos: dbTODO,
        recom: recom
      });
    });
  });

  app.get("/", function (req, res) {
    db.TODO.findAll({}).then(function (dbTODO) {
      res.render("index", {
        todos: dbTODO
      });
    });
  });

  app.get("/create", function (req, res) {
    res.render("create");
  })
  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
