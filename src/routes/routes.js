const express = require('express');
const router = express.Router();

const userRouter = require('../routes/user.route');
router.use('/v1/user', userRouter);

module.exports = router;