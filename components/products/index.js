var express = require('express');
var router = express.Router();

const ProductController = require('./productController');


router.post('/add', ProductController.add);
router.get('/addproduct', ProductController.addproduct);


router.get('/productsDetail', ProductController.productDetail);

router.get('/', ProductController.products);
module.exports = router;