const Product = require('./productModel');
const ProductType = require('./productTypeModel');
const ProductColor = require('./productColorModel');

const { mutipleMongooseToObject } = require('../../conf/util/mongooese');
const cloudinary = require('../../conf/util/cloudinary');
const upload = require("../../conf/util/multer")

class ProductController {
    //[GET] 

    async products(req, res, next) {
        try {
            const products = await Product.find({})
            const productTypes = await ProductType.find({})
            res.render('products/products', {
                products: mutipleMongooseToObject(products),
                productTypes: mutipleMongooseToObject(productTypes)
            });
        } catch {
            res.redirect('/products')
        }
    };
    //[GET]     

    async addproduct(req, res, next) {
        try {
            const ProductTypes = await ProductType.find({})
            const ProductColors = await ProductColor.find({})
            res.render('products/addproduct', {
                ProductTypes: mutipleMongooseToObject(ProductTypes),
                ProductColors: mutipleMongooseToObject(ProductColors)
            });
        } catch {
            res.redirect('/products')
        }
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
    async restore(req, res, next) {
        const products = await Product.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    /* productType*/
    async addproductType(req, res) {
        const productTypes = await ProductType.find({})
            .then((productTypes) => {
                res.render('products/addproductType', {
                    productTypes: mutipleMongooseToObject(productTypes)
                });
            })
            .catch(next);
    };
    async submitproductType(req, res) {

        try {
            const productType = new ProductType(req.body);
            const newproductType = await productType.save()
            res.redirect('/products')
        } catch {
            res.render('products/addproduct', {
                errorMessage: 'Error creating product'
            })
        }
    };
}

module.exports = new ProductController();