

const express = require('express');
const router = express.Router();

const {HomeControllers} = require("../controller/home");
const {AuthControllers} = require("../controller/auth");
const {ProductControllers} = require("../controller/product");

const {isLogin} = require("../middlewares/authentication")


router.get("/", HomeControllers.Userindex);

router.get("/signup",AuthControllers.SignUp);
router.post("/signup",AuthControllers.doSignUp);
router.get("/login",AuthControllers.Login);
router.post("/login",AuthControllers.doLogin);
router.get("/logout",AuthControllers.doLogout);

router.get("/addcart/:id",isLogin,ProductControllers.addCart)
router.get("/cart",isLogin,ProductControllers.cartBox)
router.post("/cart/update",isLogin,ProductControllers.cartUpdate)
router.get("/cart/remove/:id",isLogin,ProductControllers.removeFromCart)
router.get("/cart/order",isLogin,ProductControllers.orderProduct)
router.post("/cart/order",isLogin,ProductControllers.cartOderPOST)
router.get("/orders",isLogin,ProductControllers.viewOrders)
router.get("/orders/view/:id",isLogin,ProductControllers.viewOrderDetails)



module.exports = router;




