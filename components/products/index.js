var express = require('express');
var router = express.Router();
const upload = require("../../conf/util/multer")

const ProductController = require('./productController');


router.post('/add', upload.single("image_url"),ProductController.add);
router.get('/addproduct', ProductController.addproduct);


router.get('/productsDetail', ProductController.productDetail);

router.get('/', ProductController.products);
module.exports = router;