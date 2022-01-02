const Product = require('./productModel');
const { mutipleMongooseToObject } = require('../../conf/util/mongooese');
const cloudinary = require('../../conf/util/cloudinary');
const upload = require("../../conf/util/multer")

class ProductController {
    //[GET] 

    async products(req, res, next) {
        const products = await Product.find({})
            .then((products) => {
                res.render('products/products', {
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    };
    //[GET]     

    async addproduct(req, res) {
        res.render('products/addproduct');
    };
    //[POST]
    async add(req, res) {

        const result = await cloudinary.uploader.upload(req.file.path);
        try {
            const formData = req.body;
            formData.image_url = result.secure_url;
            const product = new Product(formData);
            const newproduct = await product.save()
            res.redirect('/products')
        } catch {
            res.render('products/addproduct', {
                errorMessage: 'Error creating product'
            })
        }
    };
    //[GET]
    async productDetail(req, res) {
        res.render('products/productDetail');
    };

    /* Delete & Trash*/
    //delete trash
    async deleteproduct(req, res, next) {
        const products = await Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    };
    //delete soft
    async deletesoftproduct(req, res, next) {
        const products = await Product.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    };
    //load products in trash
    async trash(req, res, next) {
        const products = await Product.findDeleted({})
            .then((products) => {
                res.render('products/productsTrash', {
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    };
    //[PATCH] restore
    async restore(req, res, next){
        const products = await Product.restore({_id: req.params.id})
        .then(() =>res.redirect('back'))
        .catch(next);
    }
    
}

module.exports = new ProductController();