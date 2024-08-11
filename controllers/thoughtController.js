const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// ?
const thoughtCount = async () => {
    const numberOfStudents = await Thought.aggregate()
        .count('thoughtCount');
    return numberOfStudents;
}

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            const thoughtObj = {
                thoughts,
                thoughtCount: await thoughtCount(),
            };

            res.json(thoughtObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json({
                thought,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(
                req.body);

            const user = await User.findOneAndUpdate({ username: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true })

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {

            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: "No Thought with that Id." });
            }

            const newThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
            if (!newThought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            // If username changed, swap out the thoughts
            if (req.body.username) {
                await User.findOneAndUpdate(
                    { username: thought.username },
                    { $pull: { thoughts: thought._id } },
                    { new: true });

                await User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: thought._id } },
                    { new: true })
            }

            res.json(newThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            await User.findOneAndUpdate({ username: thought.username },
                { $pull: { thoughts: thought._id } },
                { new: true });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
};