const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Card, Stack } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, phoneNumber, username } = req.body;
    const user = await User.signup({ email, username, phoneNumber, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

// Delete
router.post('/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const userStacks = await Stack.destroy({ where: { userId: userId }, truncate: false });
  const user = await User.destroy({ where: { id: userId } });

  return res.json({ user });
}))

module.exports = router;
