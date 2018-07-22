const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}
));

function validationVideo(video) {
    const schema = {
        name: Joi.string().min(5).required()
    }

    return Joi.validate(video, schema);
}

exports.Genre = Genre;
exports.validate = validationVideo;