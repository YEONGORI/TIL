const model = require('../models');

module.exports = async (req, res) => {
    let result = await model.boards.findAll({}).catch((err) => console.log(err));
    console.log(result);
    res.render('index', {title: 'test', rows: result});
}
