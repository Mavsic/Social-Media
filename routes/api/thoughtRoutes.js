const router = require("express").Router();

const {
    getThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

//Thought Routes
router.route("/").get(getThought);
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);
router.route("/:userId").post(createThought);

//Reaction Routes
router.route("/toughtId/reaction/:reactionId").delete(deleteReaction);
router.route("/thoughtId/reaction").post(addReaction);

module.exports = router;