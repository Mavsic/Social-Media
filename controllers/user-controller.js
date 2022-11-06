const { User } = require("../models");

const userController = {

    createUser({body}, res) {
        User.create(body)
        .then(dbUserdata => res.json(dbUserdata))
        .catch(err => res.status(400).json(err));

    },
    getUsers(req, res) {
        User.find({})
        .populate({path: "thought", select: "-__v"})
        .populate({path: "friends", slect: "-__v"})
        .select("-__v")
        .then(dbUserdata => res.json(dbUserdata))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

    },
   getUserById({params}, res) {
    User.findOne({_id: params.id})
    .populate({path: "thought", select: "-__v"})
    .populate({path: "friends", select: "-__v"})
    .select("-__v")
    .then(dbUserdata => {
        if(!dbUserdata) {
            res.status(400).json({message: "No user with matching is was found"});
            return;
        }
        res.json(dbUserdata)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
   },
 
updateUser({params, body}, res) {
    User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .then(dbUserdata => {
        if(!dbUserdata) {
            res.status(400).json({message: "No user with matching is was found"});
            return;
        }
        res.json(dbUserdata);
 })
     .catch(err => res.status(400).json(err));
},
addFriend({params}, res) {
    User.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
    .populate({path: "friends", select: ("-__v")})
    .select("-__v")
    .then(dbUsersData => {
        if (!dbUsersData) {
            res.status(404).json({message: "No user with matching is was found"});
            return;
        }
    res.json(dbUsersData);
    })
    .catch(err => res.json(err));
},

deleteFriend({ params }, res) {
    Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
    .populate({path: "friends", select: "-__v"})
    .select("-__v")
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: "No user with matching is was found"});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.status(400).json(err));
}
};

module.exports = userController;