const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

const { requireAuth } = require("../../utils/auth");
const { Stack, User, Card, Category } = require("../../db/models");
const db = require("../../db/models");

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

// Get a stack
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

// Create a session user's stack
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

// Delete a session user's stack
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

// Get a random stack
router.get(
  "/features/random",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const stack = await Stack.findOne({ order: [db.sequelize.fn("RANDOM")] });

    return res.json({ stackId: stack.id });
  })
);

// Search stacks by name and category
router.get(
  "/features/search",
  asyncHandler(async (req, res) => {
    let search = req.query.search;
    let categories = !req.query.category
      ? []
      : typeof req.query.category === "string"
      ? [req.query.category]
      : req.query.category;

    const results = await Stack.findAll({
      where: {
        name: { [Op.iLike]: `%${search}%` },
        categoryId: { [Op.or]: categories },
      },
      include: [User, Card, Category],
    });

    return res.json({ results });
  })
);

module.exports = router;
