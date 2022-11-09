const { Schema, model, Types} = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
    // Set custom ID 
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {
    toJSON: {
        getters: true
    } 
    }
);

// ThoughtSchema
const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Moment
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    user: {
        type: String,
        required: true
    },
    // Use ReactionsSchema to validate data
    reaction: [reactionSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
)

// get total count of reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thoughts model using the Thoughts Schema
const Thought = model('thought', thoughtSchema);

// Export Thoughts Module
module.exports = Thought;