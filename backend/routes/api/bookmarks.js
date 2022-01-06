const express = require("express");
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");
const { Bookmark } = require("../../db/models");

const router = express.Router();

// Get session user's bookmarks
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    const bookmarks = await Bookmark.findAll({ where: { userId: user.id } });

    return res.json({ bookmarks });
  })
);

// Create a session user's bookmark
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    const { stackId } = req.body;

    const bookmark = await Bookmark.create({ userId: user.id, stackId });
    await bookmark.save();

    return res.json({ bookmark });
  })
);

// Delete a session user's bookmark
router.delete(
  "/:bookmarkId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const { bookmarkId } = req.params;

    const bookmark = await Bookmark.findByPk(bookmarkId);

    if (bookmark.userId !== user.id) {
      const err = new Error("Unauthorized");
      err.title = "Unauthorized";
      err.errors = ["Unauthorized"];
      err.status = 401;
      return next(err);
    } else {
      await bookmark.destroy();
      return res.json({ bookmark });
    }
  })
);

module.exports = router;
