var express = require('express');
var router = express.Router();
const upload = require("../../conf/util/multer");
const productController = require('./productController');

const ProductController = require('./productController');


router.post('/add', upload.single("image_url"),ProductController.add);
router.get('/addproduct', ProductController.addproduct);
router.get('/productsDetail', ProductController.productDetail);
router.get('/', ProductController.products);
router.delete('/:id', ProductController.deletesoftproduct);
router.delete('/:id/delete', ProductController.deleteproduct);
router.get('/productsTrash', ProductController.trash);
router.patch('/:id/restore',productController.restore);
module.exports = router;