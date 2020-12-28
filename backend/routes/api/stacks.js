const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { Stack, User } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const stacks = await Stack.findAll({ include: User });

    return res.json({ stacks });
}));

// router.get('/:id', asyncHandler(async (req, res) => {
//     const { id } = req.params.id;
//     const stack = await Stack.findAll({ where: { id: id } });

//     return res.json({ stack });
// }));

router.post('/', asyncHandler(async (req, res) => {
    const { name, categoryId, userId } = req.body;

    const newStack = await Stack.create({ name, categoryId, userId });
    newStack.save();

    return res.json({ newStack });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params.id;
    await Stack.destroy({ where: { id: id } });

    return res.json('Stack deleted')
}));

module.exports = router;