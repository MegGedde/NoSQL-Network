const { ObjectId } = require('bson');
const { Schema, model, trusted } = require('mongoose');

const ReactionSchema = new Schema ({
    reactionId: {
        type: ObjectId,
        //TODO: new
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        //TODO: get timestamp
        default: Date.now,
        get
    }
},
{
    toJSON: {
      getters: true
    }
  }
  );

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String, 
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        //TODO: java date
        type: Date,
        default: Date.now,
        getter_format
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
  );

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;