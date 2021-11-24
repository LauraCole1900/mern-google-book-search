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

  // async saveBook({ user, body }, res) {
  //   console.log(user);
  //   try {
  //     const updatedUser = await User.findOneAndUpdate(
  //       { _id: user._id },
  //       { $addToSet: { savedBooks: body } },
  //       { new: true, runValidators: true }
  //     );
  //     return res.json(updatedUser);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(400).json(err);
  //   }
  // },


  // DELETE user
  removeUser: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}