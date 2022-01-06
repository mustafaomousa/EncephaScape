const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Stack, User, Card, Category } = require("../../db/models");

const router = express.Router();

// Get session user's stacks
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    const stacks = await Stack.findAll({
      where: { userId: user.id },
      include: [User, Category, Card],
    });

    return res.json({ stacks });
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
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    const { name, categoryId, cards } = req.body;

    const newStack = await Stack.create({ name, categoryId, userId: user.id });

    for (cardNumber in cards) {
      const card = cards[cardNumber];

      await Card.create({
        stackId: newStack.id,
        term: card.term,
        response: card.response,
      });
    }

    const stack = await Stack.findByPk(newStack.id, {
      include: [User, Card, Category],
    });

    return res.json({ stack });
  })
);

router.delete(
  "/:stackId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    const { stackId } = req.params;
    const stack = await Stack.findByPk(stackId);

    if (stack.userId !== user.id) {
      const err = new Error("Unauthorized");
      err.title = "Unauthorized";
      err.errors = ["Unauthorized"];
      err.status = 401;
      return next(err);
    } else {
      await Card.destroy({ where: { stackId: stackId } });
      await stack.destroy();
      return res.json({ stack });
    }
  })
);

module.exports = router;
