const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { Stack, User, Card, Category } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const stacks = await Stack.findAll({ include: [User, Category] });

    return res.json({ stacks });
  })
);

router.get(
  "/category/:categoryId",
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    const stacks = await Stack.findAll({ where: { categoryId: id } });
    return res.json({ stacks });
  })
);

router.get(
  "/top",
  asyncHandler(async (req, res) => {
    const stacks = await Stack.findAll({
      limit: 10,
      order: [["updatedAt", "DESC"]],
    });
    return res.json({ stacks });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, categoryId, userId } = req.body;

    const stack = await Stack.create({ name, categoryId, userId });

    const newStack = await Stack.findByPk(stack.id, {
      include: [User, Card, Category],
    });

    return res.json({ stack: newStack });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    console.log(id);
    const updatedStack = await Stack.findByPk(id);
    await updatedStack.update({ name });
    return res.json({ updatedStack });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Card.destroy({ where: { stackId: id } });
    const stack = await Stack.findByPk(id);
    if (!stack) throw new Error("Cannot find stack");
    await Stack.destroy({ where: { id: stack.id } });
    return res.json({ stack });
  })
);

module.exports = router;
