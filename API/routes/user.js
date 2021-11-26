const Router = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");

const router = Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        profile: req.body.profile,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

router.get("/user", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user.id }, (err, doc) => {
      if (err) throw err;
      res.send(doc);
    }).populate('events');
  }else{
    res.send('Usuario no logueado')
  }
});

router.put("/user_update", (req, res) => {
  User.findOneAndUpdate({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not Found");
    if (doc) {
      doc.profile = req.body.profile;
      await doc.save();
      res.send("User Updated");
    }
  });
});

module.exports = router;
