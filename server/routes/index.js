const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Guten Tag 👋");
});

module.exports = router;
