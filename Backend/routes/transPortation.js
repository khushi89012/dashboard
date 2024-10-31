const express = require('express');
const router = express.Router();
const Transportation = require('../models/TransPortation'); 

router.get('/transport', async (req, res) => {
    const { page = 1, limit = 10, filter } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;
    const query = filter ? { licenseClass: filter } : {}; 

    try {
        const transport = await Transportation.find(query).skip(skip).limit(limitNumber);
        const total = await Transportation.countDocuments(query); 

        res.json({
            total, 
            page: pageNumber,
            limit: limitNumber,
            data: transport
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
