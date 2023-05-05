const model = require('../models');
const express = require('express');

exports.getList = async (req, res, next) => {
    let result = await model.boards.findAll({}).catch((err) => console.log(err));
    console.log('rows: ', JSON.stringify(result));
    res.render("HI")
    res.render('list', {title: "게시판 전체 글 조회", rows: result});
}

exports.getListFirst = async (req, res) => {
    res.redirect('/board/list/1');
}