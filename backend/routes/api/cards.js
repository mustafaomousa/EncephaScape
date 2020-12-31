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
    return res.json({ newCard });
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const { cardId } = req.body;
    const deletedCard = await Card.findByPk(cardId);
    await deletedCard.destroy();
    return res.json({ deletedCard });
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { cardId, term, response } = req.body;
    const updatedCard = await Card.findByPk(cardId);
    await updatedCard.update({ term, response });
    return res.json({ updatedCard });
}));

module.exports = router;