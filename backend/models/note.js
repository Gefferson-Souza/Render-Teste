require('dotenv').config()

const mongoose = require('mongoose')


const noteSchema = mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedNote) => {
        returnedNote.id = returnedNote._id.toString()
        delete returnedNote._id;
        delete returnedNote.__v;
    }
})

module.exports = mongoose.model('Note', noteSchema)