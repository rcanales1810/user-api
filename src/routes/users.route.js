const express = require("express");
const {
    getUsers,
    createNewUser,
    getUserById,
    updateUser
} = require("../controllers/user.controller");

const router = express.Router();

//En los dos casos de abajo, revisar BIEN el método que se usa
router.get("/", getUsers);
router.post("/", createNewUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

module.exports = router;