const Router = require("express");
const Event = require("../models/event");

const router = Router();

router.post("/event", (req, res) => {
  Event.findOne({ name: req.body.name }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("Event Already Exists");
    if (!doc) {
      const newEvent = new Event({
        name: req.body.name,
        location: req.body.location,
        info: req.body.info,
        event_pay: req.body.event_pay,
        date: req.body.date,
        user: req.body.user,
      });
      await newEvent.save();
      res.send("Event Created");
    }
  });
});

module.exports = router;

