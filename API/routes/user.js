const Router = require("express");
const User = require("../models/user");
const passport = require("passport");
const Event = require("../models/event");
const bcrypt = require("bcryptjs");
const router = Router();

const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.sendStatus(401);
};
router.get("/validateUser", async (req, res) => {
  console.log(req.query.username);
  let user = req.query.username;
  let users = [];
  await User.find((err, doc) => {
    doc.map((elem) => {
      users.push(elem.username);
    });
  });
  console.log(users);
  let existente = false;
  users.forEach((elem) => {
    if (elem === user) {
      existente = true;
    }
  });
  res.send(existente);
});

router.get("/user", isAuthenticated, async (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }, async (err, doc) => {
      if (err) throw err;
      if (!doc) res.send("User Not Found");
      if (doc) {
        res.send(doc);
      }
    })
      .populate({
        path: "follows",
        populate: { path: "events" },
      })
      .populate("events")
      .populate("promises");
  } else {
    res.send("Usuario no logueado");
  }
});
// router.get('/deleteuser', async(req,res)=>{
//   // User.findOne({_id: '61b7d4c0311c1e0023d32b35'},async(err,doc)=>{
//   //   res.send(doc)
//   // })
//   User.deleteOne({_id:'61b7d899b9fb7d4a74e96412'}).then(()=>{res.send('Usuario eliminado')})
// })

router.put("/user_update", isAuthenticated, (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not Found");
    if (doc) {
      doc.profile = req.body.profile;
      doc.publicKey = req.body.key;
      await doc.save().then((r) => {
        console.log(doc);
        res.send("User Updated");
      });
    }
  });
});

router.put('/userComplete',isAuthenticated, (req,res)=>{
  User.findOne({username:req.body.user.username}, async (err,doc)=>{
    const hashedPassword = await bcrypt.hash(req.body.user.password, 10);
    let user= req.body.user
    if(err) throw err;
    if(!doc) res.send('User Not Found')
    if(doc){ 
      if(doc.email){
        delete doc.email
      }
      doc.events= user.events
      doc.follows = user.follows
      doc.near= user.near
      doc.password = hashedPassword
      doc.payedEvents = user.payedEvents
      doc.profile= user.profile
      doc.promises = user.promises 
      doc.selledEvents = user.selledEvents
      doc.subscriptions = user.subscriptions
      doc.username = user.username
      doc.__v= user.__v
      doc._id= user._id
      doc.save()
      .then(()=>{
        console.log('UserComplete');
        res.send(doc)

      })
    }
  })
})

router.post("/subscriptions", isAuthenticated, (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.subscriptions = [...doc.subscriptions, req.body.data];
      await doc.save().then((r) => {
        console.log(doc);
        res.send({ Successfull: "User subscribed", data: r.subscriptions });
      });
    }
  });
});

router.delete("/subscriptions", isAuthenticated, (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.subscriptions = doc.subscriptions.filter((s) => s !== req.body.data);
      await doc.save().then((r) => {
        console.log(doc);
        res.send({ Successfull: "User unsubscribed", data: r.subscriptions });
      });
    }
  });
});

router.delete("/subscriptions/all", isAuthenticated, (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.subscriptions = [];
      await doc.save().then((r) => {
        console.log(doc);
        res.send({ Successfull: "User unsubscribed", data: r.subscriptions });
      });
    }
  });
});

router.get("/other-user/:id", isAuthenticated, (req, res, next) => {
  console.log(req.params.id);
  User.findOne({ _id: req.params.id }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      var info = {
        id: req.params.id,
        follows: doc.follows,
        profile: doc.profile,
      };
      res.send(info);
    }
  });
});
router.post("/follows", isAuthenticated, (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.follows.push(req.body.data);
      await doc.save().then((r) => {
        console.log(doc);
        res.send({ Successfull: "User followed", data: r.follows });
      });
    }
  });
});

router.post("/present", isAuthenticated, (req, res, next) => {
  console.log(req.body.data);
  User.findOne({ _id: req.body.id1 }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      doc.promises.push(req.body.id2);
      await doc.save().then((r) => {
        Event.findOne({ user: req.body.id2 }, async (err, doc) => {
          if (err) throw err;
          if (!doc) res.send("Event Not found");
          if (doc) {
            doc.promises.push(req.body.id1);
            await doc.save().then((r) => {
              console.log(doc);
              res.send({ Successfull: "User followed", data: r.people });
            });
          }
        });
      });
    }
  });
});

<<<<<<< HEAD
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

=======
router.delete("/follows", isAuthenticated, (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) res.send("User Not found");
    if (doc) {
      let index = doc.follows.indexOf(req.body.data);
      doc.follows.splice(index, 1);
      await doc.save().then((r) => {
        console.log(doc);
        res.send({ Successfull: "User unfollowed", data: r.follows });
      });
    }
  });
});
>>>>>>> cb65d4035058e7d989ee3cf7d8b059d25236ef3a

module.exports = router;
