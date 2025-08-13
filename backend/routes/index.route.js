const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Server is running!");
});

// router.use("/auth", require("./auth.route"));

module.exports = router;