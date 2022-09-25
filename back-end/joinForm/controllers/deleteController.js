let deleteModel = require('../models/deleteModel');

module.exports = {
    deleteData: (req, res) => {
        let idx = req.body.idx;
        deleteModel.deleteData(idx, () => {
            res.redirect('/board');
        });
    }
};