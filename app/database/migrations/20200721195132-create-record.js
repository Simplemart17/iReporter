
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdOn: {
        type: Sequelize.DATE,
      },
      title: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      videoUrl: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('records');
  },
};
