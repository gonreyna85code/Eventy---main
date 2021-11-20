const Router = require("express");
require("dotenv").config();
const { User } = require("../db");

const router = Router();


router.post("/user", async (req, res) => {
    const info = req.body;
    if (info.name === "") return res.status(505).send("Must have a name");
    await User.create(info);
    const DB_user = await User.findAll({
      where: { name: info.name },
    });  
    res.send(DB_user);
  });




module.exports = router;