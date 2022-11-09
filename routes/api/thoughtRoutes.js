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
router.route("/").get(getThought).post(createThought);
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);


//Reaction Routes
router.route("/thoughtId/reaction/:reactionId").delete(deleteReaction);
router.route("/thoughtId/reaction").post(addReaction);

module.exports = router;