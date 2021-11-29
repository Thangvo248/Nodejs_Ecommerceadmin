const Product = require('../products/productService');
const { mutipleMongooseToObject } = require('../util/mongooese');

exports.products= async(req,res)=>{

    Product.find({})
        .then(products=> {
            res.render('products/products',{ products: mutipleMongooseToObject(products) 
            });
        })
        .catch(next);
    //res.render('products/products');
}
//get 
exports.addproduct= async(req,res)=>{
    res.render('products/addproduct');
}

//post
exports.add= async(req,res)=>{

    const product = new Product(res.body);
    product.save();
}

exports.productDetail= async(req,res)=>{
    res.render('products/productDetail');
}