const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const shipSchema = new Schema({
    shipName: {
        type: String,
        required: true
    },
    model: { 
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
    annualInspectionDate: {
        type: String,
        required: true
    },
    fiveYearInspectionCert: {
        type: String,
        required: true
    },
    fiveYearInspectionDate: {
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
    gear: {
        type: String,
        required: true
    },
    gearSerialNumber: {
        type: String,
        required: true
    },
    jet: {
        type: String,
        required: true
    },
    jetSerialNumber: {
        type: String,
        required: true
    },
    volvoQ0087: {
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
    notes: { 
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    pdfs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pdf'
        }
    ]
});

const Ship = model("Ship", shipSchema);

module.exports = Ship;