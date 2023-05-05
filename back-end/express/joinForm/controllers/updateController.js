const model = require('../models');
const express = require('express');
const url = require('url');

exports.updateForm = async (req, res, next) => {
    let queryData = url.parse(req.url, true).query;
    let id = queryData.id;

    let result = await model.boards.findAll({where: {id: parseInt(id)}}).catch((err) => console.log(err));
    console.log('update에서 1개 글 조회 결과 확인: ', row);
    res.render('update', {title: "글 수정", row: result[0]});
}

exports.updateData = async (req, res) => {
    let id = req.body.idx;
    let passwd = req.body.passwd;
    let datas = {
        creator_id: req.body.creator_id,
        title: req.body.title,
        content: req.body.content,
        passwd: req.body.passwd,
        updatedAt: Date.now()
    }

    let result = await model.boards.update(datas, {where: {id: id, passwd: passwd}}).catch((err) => console.log(err));
    console.log(datas, result);

    if (result[0] == 0)
        res.send("<script>alert('패스워드가 일치하지 않거나, 잘못된 요청으로 인해 변경되지 않았습니다.');history.back();</script>");
    else
        res.redirect('/board/read/' + id);
    res.redirect('/board');
}