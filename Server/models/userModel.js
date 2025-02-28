const db = require("../config/userconfigs");

const User = {
  create: (name, email, pass, callback) => {
    const sql = "INSERT INTO user (name, email, pass) VALUES (?, ?, ?)";
    db.query(sql, [name, email, pass], callback);
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], callback);
  },
};

module.exports = User;
