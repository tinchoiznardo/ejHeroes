const newLocal = require("../controllers/mainController");
const main = (req, res) => {
    res.send(newLocal);
};

module.exports = main;