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
  getThisUser: async function (req, res) {
    console.log("from userController getThisUser", req.params)
    const thisUser = db.User.findOne({
      $or: [{ _id: req.user ? req.user._id : req.params.id }, { email: req.params.email }]
    })
    if (!thisUser) {
      return res.status(400).json({ message: "User not found" })
    }
    res.json(thisUser);
  },

  //   // get a single user by either their id or their username
  //   async getSingleUser({ user = null, params }, res) {
  //   const foundUser = await User.findOne({
  //     $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
  //   });

  //   if (!foundUser) {
  //     return res.status(400).json({ message: 'Cannot find a user with this id!' });
  //   }

  //   res.json(foundUser);
  // },


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