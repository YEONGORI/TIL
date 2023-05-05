const model = require('../models');
const express = require('express');

exports.writeForm = async (req, res) => {
    res.render('write', {title: "게시판 글 쓰기"});
}

exports.writeData =async (req, res) => {
    const datas = {
        creator_id: req.body.creator_id,
        title: req.body.title,
        content: req.body.content,
        passwd: req.body.passwd
        // ,image: `/images/${req.file.filename}`
    }

    const result = await model.boards.create(datas).catch((err) => console.log(err));
    console.log(datas);
    res.redirect('/board');
};