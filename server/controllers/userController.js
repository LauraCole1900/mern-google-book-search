const ObjectId = require("mongodb").ObjectId;
const db = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
  // POST new user to database
  create: async function (req, res) {
    console.log("from userController create", req.body)
    const user = await db.User.create(req.body);
    if (!user) {
      return res.status(400).json({ message: "Could not create account at this time." })
    }
    const token = signToken(user)
    res.json({ token, user });
  },

  // POST user for login
  login: async function (req, res) {
    console.log("from userController login", req.body);
    const user = await db.User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Login failed" });
    }
    const correctPassword = await user.isCorrectPassword(req.body.password);
    console.log({ correctPassword });
    if (!correctPassword) {
      return res.status(400).json({ message: "Login failed" });
    }
    const token = signToken(user);
    console.log({ token }, { user });
    res.json({ token, user });
  },


  // GET user by email
  findByEmail: function (req, res) {
    console.log("from userController findByEmail", req.params.email)
    db.User
      .findOne({ email: req.params.email })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },


  // PUT user
  updateUser: function (req, res) {
    console.log("from userController updateUser", req.body)
    db.User
      .findOneAndUpdate({ email: req.body.email }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },


  // DELETE user
  removeUser: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}