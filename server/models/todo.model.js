module.exports = (sequelize, Sequelize) => {
  const todo = sequelize.define("todo", {

    done: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    owner: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    restart_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

  }, {underscored: true});

  return todo;
};