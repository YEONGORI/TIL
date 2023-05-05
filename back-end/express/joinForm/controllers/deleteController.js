const model = require('../models');
const express = require('express');

exports.deleteData = async (req, res) => {
    let id = req.body.id;
    
    const result = await model.boards.delete(id).catch((err) => console.log(err));
    console.log(result);
    res.redirect('/board');
};
// let deleteModel = require('../models/deleteModel');

// module.exports = {
//     deleteData: (req, res) => {
//         let idx = req.body.idx;
//         deleteModel.deleteData(idx, () => {
//             res.redirect('/board');
//         });
//     }
// };