const Router = require("express");
const axios = require("axios").default;
require("dotenv").config();
const { Event } = require("../db");
const { User } = require("../db");

const router = Router();

   
router.get("/events", async (_req, res) => {     
    res.send(await Event.findAll());
});

router.get("/event/:id", async (req, res) => {
  const id = req.params.id;
  const event = await Event.findByPk(id);
  
  res.send(event);
});

router.post("/event", async (req, res) => {
  const info = req.body;
  if (info.name === "") return res.status(505).send("Debe tener un nombre");
  await Event.create(info);
  const DB_event = await Event.findAll({
    where: { name: info.name },
  });  
  res.send(DB_event);
});


module.exports = router;
