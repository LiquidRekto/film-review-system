"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ratings", [
      { user_id: 1, film_id: 1, rating_score: 9, comment: "Amazing movie!", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, film_id: 1, rating_score: 8, comment: "Great concept and visuals.", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, film_id: 2, rating_score: 10, comment: "Masterpiece in sci-fi!", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, film_id: 2, rating_score: 7, comment: "Good, but a bit long.", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, film_id: 3, rating_score: 9, comment: "Heath Ledger was amazing!", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, film_id: 3, rating_score: 10, comment: "Best Batman movie ever.", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, film_id: 4, rating_score: 8, comment: "Very well directed.", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, film_id: 4, rating_score: 9, comment: "Loved the twists!", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, film_id: 5, rating_score: 7, comment: "Interesting concept.", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, film_id: 5, rating_score: 6, comment: "Confusing at times.", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, film_id: 6, rating_score: 10, comment: "A timeless classic!", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, film_id: 6, rating_score: 8, comment: "Very emotional story.", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, film_id: 7, rating_score: 9, comment: "Quentin Tarantino at his best!", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, film_id: 7, rating_score: 9, comment: "Brilliant storytelling.", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, film_id: 8, rating_score: 7, comment: "Good, but not my favorite.", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, film_id: 8, rating_score: 8, comment: "Inspirational!", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, film_id: 9, rating_score: 10, comment: "Mind-blowing film!", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, film_id: 9, rating_score: 9, comment: "Very intense.", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, film_id: 10, rating_score: 10, comment: "A cinematic masterpiece!", createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, film_id: 10, rating_score: 9, comment: "Brilliant storytelling.", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ratings", null, {});
  },
};
