const express = require("express");
const validateUserId = require("../middlewares/validateUserId");

const {
    getUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser,
    patchUser
} = require("../controllers/user.controller");

const router = express.Router();

//En los dos casos de abajo, revisar BIEN el método que se usa
router.get("/", getUsers);
router.post("/", createNewUser);
router.get("/:id", validateUserId, getUserById);
router.put("/:id", validateUserId, updateUser);
router.delete("/:id", validateUserId, deleteUser);
router.patch("/:id", validateUserId, patchUser);

module.exports = router;