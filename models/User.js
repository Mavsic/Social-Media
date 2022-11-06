const { Schema, model} =require("mongoose");

const userSchema = new Schema(
    {
        user: {
            type: String,
            required:true,
             trim: true       
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Using a REGEX to validate correct email
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
        },
        {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
        }
    )
    

    userSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    })
    
    
    const User = model('User', userSchema);
    
  
    module.exports = User; 
    
