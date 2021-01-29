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
    sendingUserId: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    receivingUserId: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  });
  return Message;
};
