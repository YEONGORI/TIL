let express = require('express');
let multer = require('multer');
let path = require('path');

let router = express.Router();
let listController = require('../controllers/listController');
let writeController = require('../controllers/writeController');
let readController = require('../controllers/readController');
let updateController = require('../controllers/updateController');
let deleteController = require('../controllers/deleteController');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images");
    },
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        callback(null, path.basename(file.originalname, ext) + "-")
    }
})

const upload = multer({storage: storage});

router.get('/', listController.getList);
router.get('/write', writeController.writeForm);
router.post('/write', upload.single("image"), (req, res) => {
    writeController.writeData(req, res)
});
router.get('/read/:idx', readController.readData);
router.get('/update', updateController.updateForm);
router.post('/update', multer().none(), (req, res) => {
    updateController.updateData(req, res)
});
router.post('/delete', (req, res) => {
    deleteController.deleteData(req, res);
});

module.exports=router;