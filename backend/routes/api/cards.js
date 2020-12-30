const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { Card } = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const stackCards = await Card.findAll({ where: { stackId: id } });
    return res.json({ stackCards });
}));

router.post('/:id', asyncHandler(async (req, res) => {
    const { stackId, term, response } = req.body;
    const newCard = await Card.create({ stackId, term, response });
    await newCard.save();
    return newCard;
}))

module.exports = router;