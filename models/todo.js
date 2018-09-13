module.exports = function(sequelize, DataTypes) {
  var TODO = sequelize.define("TODO", {
    name: DataTypes.STRING,
    details: DataTypes.TEXT,
    location: DataTypes.TEXT,
    deadline: DataTypes.DATE,
    category: DataTypes.STRING,
    difficulty: DataTypes.INTEGER
  });

  TODO.associate = function(models) {
   
    TODO.belongsTo(models.Account, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return TODO;
};
