const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { Category } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const categories = await Category.findAll();

    return res.json({ categories });
}));

module.exports = router;