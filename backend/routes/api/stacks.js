const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { Stack, User, Card, Category } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const newestStacks = await Stack.findAll({
      limit: 4,
      order: [["createdAt", "DESC"]],
      include: [User, Category, Card],
    });

    return res.json({ newestStacks });
  })
);

router.get(
  "/:stackId",
  asyncHandler(async (req, res) => {
    const { stackId } = req.params;
    const stack = await Stack.findByPk(stackId, {
      include: [User, Card, Category],
    });

    return res.json({ stack });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, categoryId, userId, cards } = req.body;

    const stack = await Stack.create({ name, categoryId, userId });

    for (cardNumber in cards) {
      const card = cards[cardNumber];
      console.log(card);
      await Card.create({
        stackId: stack.id,
        term: card.term,
        response: card.response,
      });
    }

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
