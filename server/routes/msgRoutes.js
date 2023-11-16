const { addMessage, getAllMessages } = require('../controllers/msgController');

const router = require('express').Router();

router.post('/addmsg', addMessage)
router.get('/getmsg', getAllMessages)

module.exports = router;