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


  // GET logged-in user
  getThisUser: async function ({ user = null, params }, res) {
    console.log("from userController getThisUser", user, params);
    const thisUser = await db.User.findOne({
      $or: [{ _id: user ? user._id : params.id }]
    })
    if (!thisUser) {
      return res.status(400).json({ message: "User not found" })
    }
    res.json(thisUser);
  },


  // UPDATE user with added book
  saveBook: async function (req, res) {
    console.log("from userController saveBook", req.user, req.body)
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
    console.log("from userController deleteBook", req.user, req.params);
    const updatedUser = await db.User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { myBooks: { bookId: req.params.id }}},
      { new: true});
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found "});
      }
      return res.json(updatedUser);
  }

  // async deleteBook({ user, params }, res) {
  //   const updatedUser = await User.findOneAndUpdate(
  //     { _id: user._id },
  //     { $pull: { savedBooks: { bookId: params.bookId } } },
  //     { new: true }
  //   );
  //   if (!updatedUser) {
  //     return res.status(404).json({ message: "Couldn't find user with this id!" });
  //   }
  //   return res.json(updatedUser);
  // },
}