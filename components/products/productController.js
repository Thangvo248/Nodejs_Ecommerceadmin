const Product = require('./productModel');
const ProductType = require('./productTypeModel');
const ProductColor = require('./productColorModel');
const productservice=require('./productService');

const { mutipleMongooseToObject } = require('../../conf/util/mongooese');
const cloudinary = require('../../conf/util/cloudinary');
const upload = require("../../conf/util/multer")
const ITEM_PRODUCTS_PER_PAGE=12;

class ProductController {
    //[GET] 

    async products(req, res, next) {
        try {
            const page=req.query.page||1;
            const q= req.query.q;
            const producttype=req.query.producttype;
            const filter={};
            if(q)
            filter.name= RegExp(q,'i');
            if(producttype)
            filter.product_type=producttype;
            const totalProduct=await Product.count(filter);
            const products = await productservice.list(filter,ITEM_PRODUCTS_PER_PAGE,page-1);
            const productTypes = await ProductType.find({})
            res.render('products/products', {
                products: mutipleMongooseToObject(products),
                productTypes: mutipleMongooseToObject(productTypes),
                hasnextpage: ITEM_PRODUCTS_PER_PAGE*page<totalProduct,
                haspreviouspage: page>1,
                nextpage:page+1,
                previouspage:page-1,
                ITEM_PRODUCT_PER_PAGE: ITEM_PRODUCTS_PER_PAGE,
                currentpage:page,
                lastpage: Math.ceil(totalProduct / ITEM_PRODUCTS_PER_PAGE),
                q:q,
                product_type:producttype
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