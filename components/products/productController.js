
const Product = require('../../conf/db/productdb');
const { mutipleMongooseToObject } = require('../../conf/util/mongooese');
const cloudinary = require('../../conf/util/cloudinary');
const upload = require("../../conf/util/multer")

class ProductController {
    //[GET] 

    async products(req, res) {
        res.render('products/products')
    };
    //[GET] 

    async addproduct(req,res){
        res.render('products/addproduct');
    };
    //[POST]
    async add(req,res){
        
        const result = await cloudinary.uploader.upload(req.file.path);
        try{
            const formData = req.body;
            formData.image_url= result.secure_url;
            const product = new Product(formData);
            const newproduct = await product.save()
            res.redirect('/products')
        } catch{
            res.render('products/addproduct', {
                errorMessage: 'Error creating product'
            })
        }
    };
    //[GET]
    async productDetail(req,res){
        res.render('products/productDetail');
    }
}

module.exports = new ProductController();