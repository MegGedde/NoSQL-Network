const { User, Thought } = require('../models');

const thoughtController = {
   //get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
            });
        },
   //get one thought
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
            });
        },
    //create new thought
    addThought({ params, body }, res) {
       Thought.create(body)
       .then(({ _id }) => {
        return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
       );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
                }
                res.json(dbThoughtData);
            })
       .catch(err => res.json(err)); 
        },
    //update a thought
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body)
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
   //delete thought 
   removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id' });
                return;
            }
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;