const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { Stack } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const stacks = await Stack.findAll();

    return res.json({ stacks });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { name } = req.body;

    const newStack = await Stack.create({ name });
    newStack.save();

    return res.json({ newStack });
}));

module.exports = router;