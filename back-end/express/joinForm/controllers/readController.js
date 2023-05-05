const model = require('../models');
const express = require('express');

module.exports={
    readData: async (req, res, next) => {
        let id = req.params.id;
        let result = await model.boards.findAll({where: {id: parseInt(id)}}).catch((err) => console.log(err));
        console.log('1개 글 조회 결과 확인 : ', row);
        res.render('read', {title: "글 조회", row: row[0]});
    }
}