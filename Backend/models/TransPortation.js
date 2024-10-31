const mongoose = require('mongoose');

const TransportationDataSchema = new mongoose.Schema({
    monthYear: {
        type: Date,
        required: true,
    },
    licenseClass: {
        type: String,
        required: true,
    },
    tripsPerDay: {
        type: Number,
        required: true,
    },
    fareboxPerDay: {
        type: Number, 
        required: true,
    },
    uniqueDrivers: {
        type: Number,
        required: true,
    },
    uniqueVehicles: {
        type: Number,
        required: true,
    },
    vehiclesPerDay: {
        type: Number,
        required: true,
    },
    avgDaysVehiclesOnRoad: {
        type: Number,
        required: true,
        min: 0,
    },
    avgHoursPerDayPerVehicle: {
        type: Number,
        required: true,
        min: 0,
    },
    avgDaysDriversOnRoad: {
        type: Number,
        required: true,
        min: 0,
    },
    avgHoursPerDayPerDriver: {
        type: Number,
        required: true,
        min: 0,
    },
    avgMinutesPerTrip: {
        type: Number,
        required: true,
        min: 0,
    },
    percentOfTripsPaidWithCreditCard: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    tripsPerDayShared: {
        type: Number,
        required: true,
    }
});

const TransportationData = mongoose.model('TransportationData', TransportationDataSchema);

module.exports = TransportationData;
