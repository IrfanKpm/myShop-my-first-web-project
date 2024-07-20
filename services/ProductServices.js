const {ProductModel} = require("../models/schema");
const {CartModel} = require("../models/schema");
const {OrderModel} = require("../models/schema");

const {helper} = require("../utils/helper")


const addProduct = async (req,res)=>{
    try{
      const newProduct = new ProductModel(req.body);
      await newProduct.save();
      res.redirect('/admin'); 
    }catch(error){
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllProducts = async () => {
    try {
        return await ProductModel.find();
    } catch (error) {
        console.error("Error fetching products from the database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getCartProducts = async (userID)=>{
    try{
       return await helper.getItemsTotel(userID)
    }catch(error){
        console.log(error)
    }
}

const editProductPage = async (id)=>{
    try{
        const product = await ProductModel.findById(id);
        return product;
    }catch(error){
       return error;
    }
}

const updateProduct = async (id,data)=>{
    try{ 
      await ProductModel.findByIdAndUpdate(id,data);
      return true
    }catch(error){
      return error
    }
}

const deleteProductDB = async (id)=>{
    try{
      await ProductModel.findByIdAndDelete(id);
      return true;
    }catch(error){
       return error;
    }
}

const addToCart = async (userId,prodId)=>{
    // Fetch the product
    const product = await ProductModel.findById(prodId);
    if(!product){
        return false
    }
    // Fetch or create the cart for the user
    let cart = await CartModel.findOne({user:userId});
    if(!cart){
        cart = new CartModel({user:userId})
    }
    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(item=> item.product.toString() === prodId);
    if (itemIndex > -1){
        cart.items[itemIndex].quantity += 1;      
    }else{
        cart.items.push({product:prodId,quantity:1})
    }
    let total = 0;
    total = await helper.getTotal(cart.items)
    cart.totel = total;
    await cart.save();
    return true;
} 


const cartUpdate = async (UserID,productId,quantity)=>{
    try{
      let cart = await helper.getCartbyID(UserID)
      let item = cart.items.find(item => item.product._id.toString() === productId);
      item.quantity = quantity;
      return await cart.save();     
    }catch(error){
        return error
    }
}

const removeFromCart = async (userID,productId)=>{
    let cart = await helper.getCartbyID(userID);
    cart.items = cart.items.filter(item=>{
        return item.product._id.toString() != productId
    });
    return await cart.save();
}

const cartOderPOST = async(userID,{ name, address, pincode, mobile, paymentMethod})=>{
   try{
    let carts = await CartModel.find({user:userID});
    let cart = carts[0]
    let total = cart.totel;
    let status = paymentMethod=="cash"?"placed":"pending"
    let orderOBJ = {
        deliveryDetails: { name, address, pincode, mobile },
        user: userID,
        paymentMethod,
        products: cart.items,
        status: status,
        totalAmount: total 
      };
    let newOrder = new OrderModel(orderOBJ);
    await newOrder.save();
    await CartModel.findOneAndDelete({user:userID})
    return true  
   }catch(error){
      console.log(error)
      return false
   }
}

const viewOrders = async(req,res)=>{
    let orders = await OrderModel.find({user:req.session.user})
    return orders
}

const viewOrderDetails = async (req,res)=>{
    const order = await OrderModel.findById(req.params.id).populate('user').populate('products.product');
    return order
}


const ProductService = {
    addProduct,
    getAllProducts,
    getCartProducts,
    editProductPage,
    updateProduct,
    deleteProductDB,
    addToCart,
    cartUpdate,
    removeFromCart,
    cartOderPOST,
    viewOrders,
    viewOrderDetails 
};


module.exports = {ProductService};















