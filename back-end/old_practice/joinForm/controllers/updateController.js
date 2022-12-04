let updateModel = require('../models/updateModel');
const url = require('url');

exports.updateForm = (req, res, next) => {
    let queryData = url.parse(req.url, true).query;
    let idx = queryData.idx;
    updateModel.getData(idx, (row) => {
        console.log('update에서 1개 글 조회 결과 확인: ', row);
        res.render('update', {title: "글 수정", row: row[0]});
    });
}

exports.updateData = (req, res) => {
    let idx = req.body.idx;
    let creator_id = req.body.creator_id;
    let title = req.body.title;
    let content = req.body.content;
    let passwd = req.body.passwd;
    let datas = [creator_id, title, content, idx, passwd];

    console.log("data: ", datas);
    console.log(JSON.stringify(req.body));

    

    updateModel.updateData(datas, (result) => {
        if (result.affectedRows == 0) {
            res.send("<script>alert('패스워드가 일치하지 않거나, 잘못된 요청으로 인해 변경되지 않았습니다.');history.back();</script>");
        }
        else {
            res.redirect('/board/read/' + idx);
        }
    });
}