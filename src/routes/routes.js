const express = require('express');
const router = express.Router();
const userRouter = require('../routes/user.route');
const groupRouter = require('./group.route');
const matchRouter = require('../routes/matches.route');

router.use('/v1/user', userRouter);
router.use('/v1/group', groupRouter);
router.use('/v1/matches', matchRouter);

module.exports = router;