
const Product = require('../../conf/db/productdb');
const { mutipleMongooseToObject } = require('../../conf/util/mongooese');


class ProductController {
    //[GET] 

    async products(req, res, ) {
        res.render('products/products')
    };
    //[GET] 

    async addproduct(req,res){
        res.render('products/addproduct');
    };
    //[POST]
    async add(req,res){

        const product = new Product(req.body);
    
        try{
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