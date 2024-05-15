const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "writing_year", {
      type: DataTypes.INTEGER,
      allowNull: false,
      max: new Date().getFullYear(),
      min: 1991,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "writing_year");
  },
};
