const {ProductModel} = require("../models/schema");
const {CartModel} = require("../models/schema");


const getTotal = async (items)=>{
    let total = 0;
    for(const item of items){
        const product = await ProductModel.findById(item.product);
        if(product){
            total += product.price * item.quantity;
        }
    }
    return total
}

const getCartbyID = async(id)=>{
    let carts = await CartModel.find({ user: id }).populate('items.product');
    return carts[0]
}



const getItemsTotel = async (userId)=>{
    let cart = await getCartbyID(userId)
    let cartItems = [];
    let total = 0;
    if (cart) {
        cartItems = cart.items;
        total = await getTotal(cartItems)
    }
    return { cartItems, total };
}

const helper = {getTotal,getItemsTotel,getCartbyID}


module.exports = {helper}

