const paginationModel = require("../models/paginationModels");


const getPagination = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const items = await paginationModel.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalItems = await paginationModel.countDocuments(); // Count total items in the collection
    const totalPages = Math.ceil(totalItems / limit);

    res.json({ items, totalPages });
    } 
    catch (error) {
    res.status(500).json({
        status: 'Internal Server Error',
        error: error.message
    });
}}

module.exports = getPagination;
