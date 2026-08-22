const express = require("express");
const authorizeRole = require("../middlewares/authorizeRole");
const validateUserBody = require("../middlewares/validateUserBody");
const validatePatchUserBody = require("../middlewares/validatePatchUserBody");
const validateUserId = require("../middlewares/validateUserId");
const errorHandler = require("../middlewares/errorHandler");

const {
    getUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser,
    patchUser
} = require("../controllers/user.controller");
const { isValidPatchEmail } = require("../utils/validators");
const authToken = require("../middlewares/authToken");

const router = express.Router();

//En los dos casos de abajo, revisar BIEN el método que se usa
router.get("/", getUsers);

router.post(
    "/",
    validateUserBody,
    createNewUser
);

router.get(
    "/:id",
    authToken,
    validateUserId,
    getUserById
);

router.put(
    "/:id",
    validateUserId,
    validateUserBody,
    updateUser
);

router.delete(
    "/:id",
    authToken,
    authorizeRole("admin"),
    validateUserId,
    deleteUser
);

router.patch(
    "/:id", 
    validateUserId,
    validatePatchUserBody,
    patchUser);

module.exports = router;