const express = require("express");
const router = express.Router();

router.get("/");
router.get("/:cohortId");
router.post("/");
router.put("/:cohortId");
router.delete("/:cohortId");

module.exports = router;
