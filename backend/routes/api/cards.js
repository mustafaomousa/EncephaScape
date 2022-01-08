const express = require("express");
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");
const { Card, Stack } = require("../../db/models");

const router = express.Router();

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { stackId, term, response } = req.body;
    const card = await Card.create({ stackId, term, response });
    await card.save();
    return res.json({ card });
  })
);

router.delete(
  "/:cardId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { cardId } = req.params;
    const card = await Card.findByPk(cardId, { include: [Stack] });

    if (card.Stack.userId !== req.user.id) {
      const err = new Error("Unauthorized");
      err.title = "Unauthorized";
      err.errors = ["Unauthorized"];
      err.status = 401;
      return next(err);
    } else {
      await card.destroy();
      return res.json({ card });
    }
  })
);

router.put(
  "/:cardId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { cardId } = req.params;
    const { term, response } = req.body;
    const card = await Card.findByPk(cardId, { include: [Stack] });

    if (card.Stack.userId !== req.user.id) {
      const err = new Error("Unauthorized");
      err.title = "Unauthorized";
      err.errors = ["Unauthorized"];
      err.status = 401;
      return next(err);
    } else {
      await card.update({ term, response });
      return res.json({ card });
    }
  })
);

module.exports = router;
