const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const passport = require("passport");

router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/tasks",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })
);

router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post(
  "/users/signup",
  body("name", "Name is required").trim().notEmpty(),
  body("lastname", "Lastname is required").trim().notEmpty(),
  body("username", "Username is required").trim().notEmpty(),
  body("email", "Email is required").trim().notEmpty(),
  body("email", "Email format is not correct").isEmail(),
  body("password", "Password is required").trim().notEmpty(),
  body("confirmPassword", "Confirm Password is required").trim().notEmpty(),
  async (req, res) => {
    const { name, lastname, username, email, password, confirmPassword } = req.body;
    const errors = validationResult(req);

    let errors_personal = [];

    if (password != confirmPassword) {
      errors_personal.push({ text: "Passwords do not match" });
    }

    const userName = await User.findOne({ username: username });
    const user = await User.findOne({ name: name, lastname: lastname });
    if (userName) {
      errors_personal.push({ text: "The username is already in use" });
    }
    if (user) {
      errors_personal.push({ text: "The user already exists" });
    }

    if (!errors.isEmpty()) {
      res.render("users/signup", {
        errors: errors.array(),
        name,
        lastname,
        username,
        email,
        password,
        confirmPassword,
      });
    } else if (errors_personal.length > 0) {
      res.render("users/signup", {
        errors_personal,
        name,
        lastname,
        username,
        email,
        password,
        confirmPassword,
      });
    } else {
      const newUser = new User({
        name,
        lastname,
        username,
        email,
        password,
        confirmPassword,
      });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Account created successfully");
      res.redirect("/users/signin");
    }
  }
);

module.exports = router;
