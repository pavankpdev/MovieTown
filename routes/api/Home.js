const router = require("express").Router();

router.get("/", (req, res) => res.json({ Message: "Hello KP!" }));

module.exports = router;
