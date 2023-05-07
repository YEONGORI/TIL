const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('joinForm', {title: 'Join Form!'});
});

router.post('/', function(req, res, next) {
    console.log('req.body: ' + JSON.stringify(req.body));
    res.json(req.body);
})

module.exports = router;