const express = require("express");
const router = express.Router();

router.get("/");
router.get("/cohort/:cohortId");
router.get("/:studentId");
router.post("/");
router.put("/:studentId");
router.delete("/:studentId");

module.exports = router;
