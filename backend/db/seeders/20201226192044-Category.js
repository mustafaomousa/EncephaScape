'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      { name: 'Computer Science' },
      { name: 'Mathematics' },
      { name: 'Automotive' },
      { name: 'Animals' },
      { name: 'Literature' },
      { name: 'Science' },
      { name: 'World History' },
      { name: 'Government' },
      { name: 'Television' },
      { name: 'Geography' },
      { name: 'Art' },
      { name: 'Opera' },
      { name: 'Misc' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
