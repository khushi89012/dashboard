const csv = require('csv-parser');
const fs = require('fs');
const TransportationData = require('../models/TransPortation'); 
const csvQueue = require('../config/queue');

csvQueue.process(async (job) => {
    const filePath = job.data.filePath;
    const transportationDataArray = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const {
                month_year,
                license_class,
                trips_per_day,
                farebox_per_day,
                unique_drivers,
                unique_vehicles,
                vehicles_per_day,
                avg_days_vehicles_on_road,
                avg_hours_per_day_per_vehicle,
                avg_days_drivers_on_road,
                avg_hours_per_day_per_driver,
                avg_minutes_per_trip,
                percent_of_trips_paid_with_credit_card,
                trips_per_day_shared
            } = row;

            const transportation = new TransportationData({
                monthYear: new Date(month_year), // Convert to Date
                licenseClass: license_class,
                tripsPerDay: parseInt(trips_per_day), // Convert to Integer
                fareboxPerDay: parseFloat(farebox_per_day), // Convert to Float
                uniqueDrivers: parseInt(unique_drivers),
                uniqueVehicles: parseInt(unique_vehicles),
                vehiclesPerDay: parseInt(vehicles_per_day),
                avgDaysVehiclesOnRoad: parseFloat(avg_days_vehicles_on_road),
                avgHoursPerDayPerVehicle: parseFloat(avg_hours_per_day_per_vehicle),
                avgDaysDriversOnRoad: parseFloat(avg_days_drivers_on_road),
                avgHoursPerDayPerDriver: parseFloat(avg_hours_per_day_per_driver),
                avgMinutesPerTrip: parseInt(avg_minutes_per_trip),
                percentOfTripsPaidWithCreditCard: parseFloat(percent_of_trips_paid_with_credit_card),
                tripsPerDayShared: parseInt(trips_per_day_shared)
            });

            transportationDataArray.push(transportation);
        })
        .on('end', async () => {
            try {
                await TransportationData.insertMany(transportationDataArray);
                console.log('CSV file successfully processed and data inserted');
            } catch (error) {
                console.error('Error inserting data:', error);
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
        });

    return Promise.resolve();
});

module.exports = csvQueue;
