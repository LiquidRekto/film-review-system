'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("films", [
      {
        title: "Inception",
        description: "A mind-bending thriller about dream manipulation.",
        director: "Christopher Nolan",
        thumbnailPath: "/images/inception.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Interstellar",
        description: "A sci-fi epic about space exploration and time dilation.",
        director: "Christopher Nolan",
        thumbnailPath: "/images/interstellar.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Dark Knight",
        description: "Batman faces off against the Joker in Gotham City.",
        director: "Christopher Nolan",
        thumbnailPath: "/images/dark_knight.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Parasite",
        description: "A dark satire on class struggle in modern society.",
        director: "Bong Joon-ho",
        thumbnailPath: "/images/parasite.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Matrix",
        description: "A hacker discovers the truth about reality and AI control.",
        director: "Lana & Lilly Wachowski",
        thumbnailPath: "/images/matrix.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Shawshank Redemption",
        description: "The story of hope and friendship in prison.",
        director: "Frank Darabont",
        thumbnailPath: "/images/shawshank.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Pulp Fiction",
        description: "Interwoven stories of crime and violence in Los Angeles.",
        director: "Quentin Tarantino",
        thumbnailPath: "/images/pulp_fiction.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Forrest Gump",
        description: "A slow-witted but kind-hearted man witnesses key historical events.",
        director: "Robert Zemeckis",
        thumbnailPath: "/images/forrest_gump.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=bLvqoHBptjg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Fight Club",
        description: "A man suffering from insomnia forms an underground fight club.",
        director: "David Fincher",
        thumbnailPath: "/images/fight_club.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=SUXWAEX2jlg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Godfather",
        description: "A mafia family struggles with power and betrayal.",
        director: "Francis Ford Coppola",
        thumbnailPath: "/images/godfather.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sY1S34973zA",
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
