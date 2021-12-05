const multer = require('multer') // khai báo multer

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/')
    },
    filename:function(req, file, cb) {
        cb(null, new Date().toISOString()+'-'+file.originalname)
    }
})


const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeq' || file.mimetype ==='image/png'){
        cb(null, true)
    } else{
        //tu choi file
        cb({message:'File anh khong hop le'}, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024*1024},
    fileFilter: fileFilter
})

module.exports = new upload;