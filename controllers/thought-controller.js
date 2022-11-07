const { User, Thought } = require("../models");

const thoughtController = {

    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({_id: params.userId}, {$push: {thought: _id}},{new: true});

        })
    .then(dbThoughtdata => {
        if(!dbThoughtdata) {
            res.status(400).json({message: "No toughts were find with matching id."});
            return;
        }
        res.json(dbThoughtdata)
    })
    .catch(err => res.json(err));
    },
    getThought(req, res) {
        Thought.find({})
        .populate({path: "reactions", select: "-__v"})
        .select("-__v")
        .then(dbThoughtdata => res.json(dbThoughtdata))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'reactions',select: "-__v"})
        .select("-__v")
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
            res.status(404).json({message:"No toughts were find with matching id." });
            return;
        }
        res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
},
updateThought({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .populate({path: 'reactions', select: "-__v"})
    .select("-___v")
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: "No toughts were find with matching id." });
            return;
        }
            res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
},
deleteThought({params}, res) {
    Thought.findOneAndDelete({_id: params.id})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: "No toughts were find with matching id." });
            return;
        }
        res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
},
addReaction({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
    .populate({path: 'reactions', select: "-__v"})
    .select("-__v")
    .then(dbThoughtsData => {
    if (!dbThoughtsData) {
        res.status(404).json({message: "No reaction found."});
        return;
    }
    res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err))
},
deleteReaction({params}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: "No reaction found."});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
}

};

module.exports = thoughtController;
