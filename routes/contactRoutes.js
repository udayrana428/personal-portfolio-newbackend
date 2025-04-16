const express = require("express");
const { contactController } = require("../controllers/contact");

const router = express.Router();

router.post("/sendmail", contactController);

module.exports = router;
