const model = require('../models');

exports.deleteData = async (req, res) => {
    let id = req.body.id;
    
    const result = await model.boards.destroy({where: {id: parseInt(id)}});
    console.log(result);
    res.redirect('/board');
};
