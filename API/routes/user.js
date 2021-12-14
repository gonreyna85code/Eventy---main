const Router = require("express");
const User = require("../models/user");
const passport = require("passport");
const Event = require("../models/event");

const router = Router();


const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.sendStatus(401);
}

router.get("/user", isAuthenticated, async (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }, async (err, doc) => {
      if (err) throw err;
      if (!doc) res.send("User Not Found");
      if (doc) {       
        res.send(doc);  
      }
    }).populate({
      path:     'follows',			
      populate: { path:  'events'}
      }).populate('events');
  } else {
    res.send("Usuario no logueado");
  }
});

router.put("/user_update", isAuthenticated, (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not Found");
    if (doc) {
      doc.profile = req.body.profile;
      doc.publicKey = req.body.key;
      await doc.save().then((r)=>{
        console.log(doc)
        res.send("User Updated");
      });
    }
  });
});

router.post("/subscriptions", isAuthenticated, (req,res,next) => {
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

router.delete("/subscriptions", isAuthenticated, (req,res,next) =>{
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

router.delete("/subscriptions/all", isAuthenticated, (req,res,next) =>{
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

router.get("/other-user/:id", isAuthenticated, (req,res,next)=>{
  console.log(req.params.id);
  User.findOne({_id:req.params.id}, async (err,doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      var info={id:req.params.id,follows:doc.follows,profile:doc.profile}
      res.send(info);
    }
  });
});

router.post("/follows", isAuthenticated, (req,res,next) => {
  User.findOne({username:req.body.username}, async (err,doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.follows.push(req.body.data);
      await doc.save().then((r)=>{
        console.log(doc)
        res.send({Successfull:"User followed",data:r.follows});
      })
    }
  });
});

router.delete("/follows", isAuthenticated, (req,res,next) =>{
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

router.post("/payedEvent", (req,res,next) => {
  console.log(req.body.data)
  User.findOne({username:req.body.username}, async (err,doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.payedEvents.push(req.body.data);
      await doc.save().then((r)=>{
        console.log(doc)
        res.send({Successfull:"Event payed",data:r.follows});
      })
    }
  });
});

module.exports = router;


