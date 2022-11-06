const router = require("express").Router();

const { get } = require("mongoose");
const {
    getUsers,
    getUserById, 
    createUser,
    updateUser,
    deleteUser, 
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller");

//User Routes
router.route("/").get(getUsers).post(createUser);
router.route("/id").get(getUserById).put(updateUser).delete(deleteUser);

//Friend Routes

router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
