const express = require("express");
const {
    getUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");

const router = express.Router();

//En los dos casos de abajo, revisar BIEN el método que se usa
router.get("/", getUsers);
router.post("/", createNewUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;