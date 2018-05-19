const express = require('express');
const router = express.Router();

router.get('/test',(req,res) => (res.json(200,{"msg": "Posts api looks cool"})))

module.exports = router;