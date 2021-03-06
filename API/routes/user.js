const Router = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");
const Event = require("../models/event");

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
router.get('/logout', function (req, res){
  req.logOut()  // <-- not req.logout();
  res.send('Usuario no logueado')
});

router.get("/user", async (req, res) => {
  const near = await Event.find({ location: req.user?.profile.city.cityName });
  const follows = await Event.find({ category: req.user?.subscriptions });
  if (req.user) {
    User.findOne({ _id: req.user.id }, async (err, doc) => {
      if (err) throw err;
      if (!doc) res.send("User Not Found");
      if (doc) {
        doc.near = near;
        doc.follows = follows;
        doc.save();
        res.send(doc);
      }
    }).populate('follows').populate('events');
  } else {
    res.send("Usuario no logueado");
  }
});

router.put("/user_update", (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not Found");
    if (doc) {
      doc.profile = req.body.profile;
      await doc.save().then((r)=>{
        console.log(doc)
        res.send("User Updated");
      });
    }
  });
});

router.post("/subscriptions", (req,res,next) => {
  User.findOne({username:req.body.username}, async (err,doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.subscriptions=[...doc.subscriptions,req.body.data];
      await doc.save().then((r)=>{
        console.log(doc)
        res.send({Successfull:"User subscribed",data:r.subscriptions});
      })
    }
  });
});

router.delete("/subscriptions", (req,res,next) =>{
  User.findOne({username:req.body.username}, async (err,doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.subscriptions=doc.subscriptions.filter((s)=>s!==req.body.data);
      await doc.save().then((r)=>{
        console.log(doc)
        res.send({Successfull:"User unsubscribed",data:r.subscriptions});
      })
    }
  });
});

router.delete("/subscriptions/all", (req,res,next) =>{
  User.findOne({username:req.body.username}, async (err,doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.subscriptions=[];
      await doc.save().then((r)=>{
        console.log(doc)
        res.send({Successfull:"User unsubscribed",data:r.subscriptions});
      })
    }
  });
});

router.get("/other-user/:id", (req,res,next)=>{
  User.findOne({_id:req.params.id}, async (err,doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      var info={id:req.params.id,follows:doc.follows,profile:doc.profile}
      res.send(info);
    }
  });
});

router.post("/follows", (req,res,next) => {
  User.findOne({username:req.body.username}, async (err,doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.follows=[...doc.follows,req.body.data];
      await doc.save().then((r)=>{
        console.log(doc)
        res.send({Successfull:"User followed",data:r.follows});
      })
    }
  });
});

router.delete("/follows", (req,res,next) =>{
  User.findOne({username:req.body.username}, async (err,doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      let index=doc.follows.indexOf(req.body.data);
      doc.follows.splice(index,1)
      await doc.save().then((r)=>{
        console.log(doc)
        res.send({Successfull:"User unfollowed",data:r.follows});
      })
    }
  });
});

module.exports = router;
