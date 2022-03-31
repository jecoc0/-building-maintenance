const { Schema, model } = require('mongoose');

const facilitySchema = new Schema(
    {
        name: {
            type: String,
            required: 'Name is required',
            minlength: 1,
            maxlength: 500
        }
    }
);

const Facility = model('Facility', facilitySchema);

module.exports = Facility;