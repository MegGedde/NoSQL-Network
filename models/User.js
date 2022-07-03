const { Schema, model } = require('mongoose');
const Thought = require("./Thought");

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //TODO: properly validate email
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
  );

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//remove thoughts when user deleted
UserSchema.pre("findOneAndDelete", { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getFilter());
    console.log(doc.username);
    await Thought.deleteMany({ username: doc.username });
});

const User = model('User', UserSchema);

module.exports = User;