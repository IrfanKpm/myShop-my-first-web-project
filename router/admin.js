const express = require('express');
const router = express.Router();

const {HomeControllers} = require("../controller/home");
const {AuthControllers} = require("../controller/auth");
const {ProductControllers} = require("../controller/product");


const {isAdminLogin} = require('../middlewares/authentication')

router.get("/login",AuthControllers.adminLogin)
router.post('/login',AuthControllers.doAdminLogin)
router.get("/logout",AuthControllers.doAdminLogout)

router.get("/",isAdminLogin,HomeControllers.Adminindex)
router.get("/additem",isAdminLogin,ProductControllers.newProductGet)
router.post("/additem",isAdminLogin,ProductControllers.newProductPost)
router.get("/edit/:id",isAdminLogin,ProductControllers.editProductPage)
router.post("/edit/:id",isAdminLogin,ProductControllers.updateProduct)

router.get("/delete/:id",isAdminLogin,ProductControllers.deleteProductDB)


module.exports = router;