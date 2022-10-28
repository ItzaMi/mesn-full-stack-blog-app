const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
