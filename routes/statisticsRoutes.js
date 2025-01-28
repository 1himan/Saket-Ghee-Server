// statistics routes
const express = require("express");
const { getStatistics } = require("../controllers/statisticsController");
const router = express.Router();

router.get("/admin/statistics", getStatistics);

module.exports = router;
