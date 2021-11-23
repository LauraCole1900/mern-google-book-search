const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const books = require("./bookModel")

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    myBookIds: [{
      type: Schema.Types.ObjectId,
      ref: books
    }]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare and validate password when logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual("bookCount").get(function () {
  return this.savedBooks?.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;