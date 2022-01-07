var express = require('express');
var router = express.Router();
const upload = require("../../conf/util/multer");
const ProductController = require('./productController');


router.post('/add', upload.single("image_url"),ProductController.add);
router.get('/addproduct', ProductController.addproduct);
router.get('/productsDetail', ProductController.productDetail);
router.get('/', ProductController.products);

//delete product
router.delete('/:id', ProductController.deletesoftproduct);
router.delete('/:id/delete', ProductController.deleteproduct);
router.get('/productsTrash', ProductController.trash);
router.patch('/:id/restore',ProductController.restore);

//productType
router.get('/addproductType', ProductController.addproductType);
router.post('/submitproductType', ProductController.submitproductType);
module.exports = router;