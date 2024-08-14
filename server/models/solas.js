const { Schema, model } = require("mongoose");

const shipSchema = new Schema({
    Ship: {
        type: String,
        required: true
    },
    Model: { 
        type: String
    },
    HRN: {
        type: String,
        required: true
    },
    HIN: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    sponsonSerialNumber: {
        type: String,
        required: true
    },
    SRBSerialNumber: { 
        type: String,
        required: true,
    },
    fuelTankSerialNumber: { 
        type: String,
        required: true
    },
    ZAPR356C2BVMXHookSerialNumber: {
        type: String,
        required: true
    },
    engineMakeModel: {
        type: String,
        required: true
    },
    engineSerialNumber: {
        type: String,
        required: true
    },
    POCName: { 
        type: String
    },
    POCEmail: {
        type: String
    },
    POCPhoneNumber: { 
        type: String
    },
    Notes: { 
        type: String
    },
    user: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
});

const Ship = model("Ship", shipSchema);

module.exports = Ship;