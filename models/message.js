// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
//is this really necessary for this page?
// eslint-disable-next-line no-unused-vars
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Message = sequelize.define("Message", {
    subject: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    body: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    // The email cannot be null, and must be a proper email before creation
    // eslint-disable-next-line camelcase
    sendingUser_id: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    // eslint-disable-next-line camelcase
    receivingUser_id: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  });
  return Message;
};
