'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("films", [
      {
        title: "Inception",
        description: "A mind-bending thriller about dream manipulation.",
        director: "Christopher Nolan",
        thumbnail_path: "/images/inception.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Interstellar",
        description: "A sci-fi epic about space exploration and time dilation.",
        director: "Christopher Nolan",
        thumbnail_path: "/images/interstellar.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Dark Knight",
        description: "Batman faces off against the Joker in Gotham City.",
        director: "Christopher Nolan",
        thumbnail_path: "/images/dark_knight.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Parasite",
        description: "A dark satire on class struggle in modern society.",
        director: "Bong Joon-ho",
        thumbnail_path: "/images/parasite.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Matrix",
        description: "A hacker discovers the truth about reality and AI control.",
        director: "Lana & Lilly Wachowski",
        thumbnail_path: "/images/matrix.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Shawshank Redemption",
        description: "The story of hope and friendship in prison.",
        director: "Frank Darabont",
        thumbnail_path: "/images/shawshank.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Pulp Fiction",
        description: "Interwoven stories of crime and violence in Los Angeles.",
        director: "Quentin Tarantino",
        thumbnail_path: "/images/pulp_fiction.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Forrest Gump",
        description: "A slow-witted but kind-hearted man witnesses key historical events.",
        director: "Robert Zemeckis",
        thumbnail_path: "/images/forrest_gump.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Fight Club",
        description: "A man suffering from insomnia forms an underground fight club.",
        director: "David Fincher",
        thumbnail_path: "/images/fight_club.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Godfather",
        description: "A mafia family struggles with power and betrayal.",
        director: "Francis Ford Coppola",
        thumbnail_path: "/images/godfather.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("films", null, {}); 
  }
};
