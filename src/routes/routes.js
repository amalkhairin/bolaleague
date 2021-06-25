const express = require('express');
const router = express.Router();
const userRouter = require('../routes/user.route');
const groupRouter = require('./group.route');
const matchRouter = require('../routes/matches.route');
const round16Router = require('../routes/roundsixteen.route');
const quarterFinalRouter = require('../routes/quarterfinal.route');
const semifinalRouter = require('../routes/semifinal.route');
const finalRouter = require('../routes/final.route');
const tableRouter = require('../routes/table.route');

router.use('/v1/user', userRouter);
router.use('/v1/group', groupRouter);
router.use('/v1/matches', matchRouter);
router.use('/v1/round16', round16Router);
router.use('/v1/quarter', quarterFinalRouter);
router.use('/v1/semifinal', semifinalRouter);
router.use('/v1/final', finalRouter);
router.use('/v1/table', tableRouter);

module.exports = router;