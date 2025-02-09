'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs")

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword1 = await bcrypt.hash("123", 10);
    const hashedPassword2 = await bcrypt.hash("1", 10);

    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        first_name: "Alice",
        last_name: "Johnson",
        phone_number: "+8495783666",
        email: "admin@example.com",
        dob: new Date("2003-07-09"),
        password_hash: hashedPassword1,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user1",
        first_name: "Bob",
        last_name: "Smith",
        phone_number: "+84957894834",
        email: "user@example.com",
        dob: new Date("2003-09-09"),
        password_hash: hashedPassword2,
        role: "user",
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
    await queryInterface.bulkDelete("users", {
      email: ["admin@example.com", "user@example.com"],
    });
  }
};
