


const {ProductService} = require("../services/ProductServices")


const Userindex = async (req,res)=>{
    const products = await ProductService.getAllProducts();
    let user = req.session.user;
   // console.log(user);
    res.render("userindex",{products,user});
};


const Adminindex = async (req,res)=>{
    const products = await ProductService.getAllProducts();
    const { username } = req.session.user;
    res.render("admin/adminindex",{products,username});
};


let HomeControllers = {
    Userindex,
    Adminindex
}

module.exports = {HomeControllers};

