const mongoose = require('mongoose')

const commentSchemma = new mongoose.Schema({
    comment: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
})

commentSchemma.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchemma)

