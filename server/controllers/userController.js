const ObjectId = require("mongodb").ObjectId;
const db = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
  // POST new user to database
  create: async function (req, res) {
    const user = await db.User.create(req.body);
    if (!user) {
      return res.status(400).json({ message: "Could not create account at this time." })
    }
    const token = signToken(user)
    res.json({ token, user });
  },

  // POST user for login
  login: async function (req, res) {
    const user = await db.User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Login failed" });
    }
    const correctPassword = await user.isCorrectPassword(req.body.password);
    if (!correctPassword) {
      return res.status(400).json({ message: "Login failed" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },


  // GET logged-in user
  getThisUser: async function ({ user = null, params }, res) {
    const thisUser = await db.User.findOne({
      $or: [{ _id: user ? user._id : params.id }]
    });
    if (!thisUser) {
      return res.status(400).json({ message: "User not found" })
    }
    res.json(thisUser);
  },


  // UPDATE user with added book
  saveBook: async function (req, res) {
    const updatedUser = await db.User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $addToSet: {
          myBooks: req.body
        }
      },
      { new: true, runValidators: true });
    return res.json(updatedUser);
  },


  // DELETE book
  deleteBook: async function (req, res) {
    const updatedUser = await db.User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { myBooks: { bookId: req.params.id }}},
      { new: true});
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found "});
      }
      return res.json(updatedUser);
  }

}