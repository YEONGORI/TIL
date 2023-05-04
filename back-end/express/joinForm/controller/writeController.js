let writeModel=require('../models/writeModel');

exports.writeForm = (req, res) => {
    res.render('write', {title: "게시판 글 쓰기"});
}

exports.writeData = (req, res) => {
    let creator_id = req.body.creator_id;
    let title = req.body.title;
    let content = req.body.content;
    let image = `/images/${req.file.filename}`;
    let passwd = req.body.passwd;
    let datas = [creator_id, title, content, image, passwd];
    writeModel.insertData(datas, () => {
        res.redirect('/board');
    });
};