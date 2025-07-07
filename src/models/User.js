const mongoose = require("mongoose");
const validator = require("validator");
const cookieparser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email :" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong password :" + value);
        }
      },
    },
 role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  },
  {
    timestamps: true,
  }
);



userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};




module.exports = mongoose.model("User", userSchema);