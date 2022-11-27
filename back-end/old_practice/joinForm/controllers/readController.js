let readModel = require('../models/readModel');

module.exports={
    readData: function(req, res, next) {
        let idx = req.params.idx;
        readModel.getData(idx, (row) => {
            console.log('1개 글 조회 결과 확인 : ', row);
            res.render('read', {title: "글 조회", row: row[0]});
        });
    }
}