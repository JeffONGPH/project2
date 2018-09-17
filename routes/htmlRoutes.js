var db = require("../models");
var DecisionTree = require('decision-tree');


module.exports = function (app) {
  // Load index page
  app.get("/dashboard", function (req, res) {
    db.TODO.findAll({}).then(function (dbTODO) {
      var count = 1;
      var count1 = 1;
      var training_data = [
        { "category": 0, "difficulty": 10, "duration": 60, "name": "Mow The Lawn" },
        { "category": 0, "difficulty": 10, "duration": 30, "name": "Shovel Driveway" },
        { "category": 0, "difficulty": 9, "duration": 60, "name": "Water The Lawn" },
        { "category": 0, "difficulty": 9, "duration": 30, "name": "Take Garbage To The Curb" },
        { "category": 0, "difficulty": 8, "duration": 60, "name": "Clean Bathroom" },
        { "category": 0, "difficulty": 8, "duration": 30, "name": "Organize Fridge" },
        { "category": 0, "difficulty": 7, "duration": 60, "name": "Clean Kitchen" },
        { "category": 0, "difficulty": 7, "duration": 30, "name": "Vacuum Floors" },
        { "category": 0, "difficulty": 6, "duration": 60, "name": "Mop Floors" },
        { "category": 0, "difficulty": 6, "duration": 30, "name": "Wash Dishes" },
        { "category": 0, "difficulty": 5, "duration": 60, "name": "Do Laundry" },
        { "category": 0, "difficulty": 5, "duration": 30, "name": "Wash Dishes" },
        { "category": 0, "difficulty": 4, "duration": 60, "name": "Dust Surfaces" },
        { "category": 0, "difficulty": 4, "duration": 30, "name": "Check Mail" },
        { "category": 0, "difficulty": 3, "duration": 60, "name": "Change Light Bulb" },
        { "category": 0, "difficulty": 3, "duration": 30, "name": "Pay Bills" },
        { "category": 0, "difficulty": 2, "duration": 30, "duration": 60, "name": "Make Fresh Coffee" },
        { "category": 0, "difficulty": 2, "duration": 30, "name": "Organize Clothes" },
        { "category": 0, "difficulty": 1, "duration": 60, "name": "Make Bed" },
        { "category": 0, "difficulty": 1, "duration": 30, "name": "Feed Pets" },
        { "category": 1, "difficulty": 10, "duration": 30, "duration": 60, "name": "Get A Business Loan" },
        { "category": 1, "difficulty": 10, "duration": 30, "name": "Search For Investors" },
        { "category": 1, "difficulty": 9, "duration": 60, "name": "Hire And Employee" },
        { "category": 1, "difficulty": 9, "duration": 30, "name": "Rent Office Space" },
        { "category": 1, "difficulty": 8, "duration": 60, "name": "Work On Marketing" },
        { "category": 1, "difficulty": 8, "duration": 30, "name": "Maintain Office Equipment" },
        { "category": 1, "difficulty": 7, "duration": 60, "name": "Create Plan" },
        { "category": 1, "difficulty": 7, "duration": 30, "name": "Create Business Cards" },
        { "category": 1, "difficulty": 6, "duration": 60, "name": "Create A Budget" },
        { "category": 1, "difficulty": 6, "duration": 30, "name": "Meet Partners" },
        { "category": 1, "difficulty": 5, "duration": 60, "name": "Build Website" },
        { "category": 1, "difficulty": 5, "duration": 30, "name": "Pay Vendors" },
        { "category": 1, "difficulty": 4, "duration": 60, "name": "Generate Leads" },
        { "category": 1, "difficulty": 4, "duration": 30, "name": "Create Payroll" },
        { "category": 1, "difficulty": 3, "duration": 60, "name": "Find An Accountant" },
        { "category": 1, "difficulty": 3, "duration": 30, "name": "Set Deadlines" },
        { "category": 1, "difficulty": 2, "duration": 60, "name": "Buy Mobile Phones" },
        { "category": 1, "difficulty": 2, "duration": 30, "name": "Open A Business Bank Account" },
        { "category": 1, "difficulty": 1, "duration": 60, "name": "Buy Desk Phones" },
        { "category": 1, "difficulty": 1, "duration": 30, "name": "Buy An Internet Plan" },
        { "category": 2, "difficulty": 10, "duration": 60, "name": "Work On Posture" },
        { "category": 2, "difficulty": 10, "duration": 30, "name": "Book Vacation" },
        { "category": 2, "difficulty": 9, "duration": 60, "name": "Repair Car" },
        { "category": 2, "difficulty": 9, "duration": 30, "name": "Cook Dinner" },
        { "category": 2, "difficulty": 8, "duration": 60, "name": "Create A Schedule" },
        { "category": 2, "difficulty": 8, "duration": 30, "name": "Work On Goals" },
        { "category": 2, "difficulty": 7, "duration": 60, "name": "Read A Book" },
        { "category": 2, "difficulty": 7, "duration": 30, "name": "Eat More Vegetables" },
        { "category": 2, "difficulty": 6, "duration": 60, "name": "Buy Groceries" },
        { "category": 2, "difficulty": 6, "duration": 30, "name": "Write A Letter" },
        { "category": 2, "difficulty": 5, "duration": 60, "name": "Be Positive" },
        { "category": 2, "difficulty": 5, "duration": 30, "name": "Buy Gas" },
        { "category": 2, "difficulty": 4, "duration": 60, "name": "Go To The Gym" },
        { "category": 2, "difficulty": 4, "duration": 30, "name": "Check E-Mail" },
        { "category": 2, "difficulty": 3, "duration": 60, "name": "Enroll In A Class" },
        { "category": 2, "difficulty": 3, "duration": 30, "name": "Buy Tickets" },
        { "category": 2, "difficulty": 2, "duration": 60, "name": "Wake Up" },
        { "category": 2, "difficulty": 2, "duration": 30, "name": "Call Mom" },
        { "category": 2, "difficulty": 1, "duration": 60, "name": "Watch A Movie" },
        { "category": 2, "difficulty": 1, "duration": 30, "name": "Wash Hands Regularly" }
      ];

      var class_name = "name";

      var features = ["category", "difficulty"];

      var dt = new DecisionTree(training_data, class_name, features);
      var todo = new Array();
      var todocom = new Array();
      var recom = new Array();
      var recomd = new Array();

      for (var i = 0; i < dbTODO.length; i++) {

        if (dbTODO[i].completed) {
          var category;
          if (dbTODO[i].category == 'Household') { category = 0 }
          else if (dbTODO[i].category == 'Business') {
            category = 1
          }
          else if (dbTODO[i].category == 'Personal') {
            category = 2
          }
          var predicted_class = {
            count : count1,
            id: i + 1,
            name: dt.predict({
              category: category,
              difficulty: dbTODO[i].difficulty
            }),
            category: dbTODO[i].category
          };
          recomd.push(predicted_class);
          var toadd = {
            count : count1,
            todo: dbTODO[i]
          };
          todocom.push(toadd);
          count1++;
        }
        else {
          var category;
          if (dbTODO[i].category == 'Household') { category = 0 }
          else if (dbTODO[i].category == 'Business') {
            category = 1
          }
          else if (dbTODO[i].category == 'Personal') {
            category = 2
          }
          var predicted_class = {
            count : count,
            id: i + 1,
            name: dt.predict({
              category: category,
              difficulty: dbTODO[i].difficulty
            }),
            category: dbTODO[i].category
          };
          recom.push(predicted_class);
          var toadd = {
            count : count,
            todo: dbTODO[i]
          };
          todo.push(toadd);
          count++;
        }

      }
      console.log(recom);
      res.render("dashboard", {
        todos: todo,
        todocoms: todocom,
        recom: recom,
        recomd: recomd
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
