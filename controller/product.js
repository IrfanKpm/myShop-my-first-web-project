

const {ProductService} = require("../services/ProductServices");


const newProductGet = (req,res)=>{
    res.render("admin/additem",);
};

const newProductPost = (req,res)=>{
    ProductService.addProduct(req,res);
}

const deleteProductDB = async(req,res)=>{
    let productID = req.params.id;
    const result = await ProductService.deleteProductDB(productID);
    if(result){
        res.redirect("/admin")
    }else{
        console.error("Error deleting product:", result);
        res.status(500).send("Error deleting product");
    }
}

const editProductPage = async (req,res)=>{
    const id = req.params.id;
    const result = await ProductService.editProductPage(id);
    if (result){
        res.render("admin/edititem",{product:result})
    }else{
        console.error("Error fetching product:", result);
        res.status(500).send("Error fetching product");
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, price, image, description } = req.body;
    try {
        let msg = await ProductService.updateProduct(productId,{ name, price, image, description });
        if (msg){
            res.redirect("/admin")
        }else{
            console.error("Error updating product:", msg);
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Error updating product");
    }
};

const cartBox = async (req,res)=>{
    try{
      const userID = req.session.user;
      const { cartItems, total } = await ProductService.getCartProducts(userID); 
      res.render("cart", { cartItems, user: userID, total });
  } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
  }
};

const addCart = async (req,res) =>{
   try{
      const productId = req.params.id; 
      const userId = req.session.user; 
      let result = await ProductService.addToCart(userId,productId);
      if (result){
        res.status(201);
        res.redirect("/")
      }else{
        res.status("403")
      }
   }catch(error){
     res.send(error)
   }
}

const cartUpdate = async (req,res)=>{
    try{
        const { productId, quantity } = req.body;
        const userID = req.session.user;
        let result = await ProductService.cartUpdate(userID,productId,quantity)
        if(result){
            res.redirect("/cart")
        }

    }catch(error){
       console.log(error)
    }
}

const removeFromCart = async (req,res)=>{
    try{
      const userID = req.session.user;
      const productId = req.params.id;
      let result = await ProductService.removeFromCart(userID,productId)
      if(result){
         res.redirect("/cart")
      }
    }catch(error){
        console.log(error)
    }
}

const orderProduct = (req,res)=>{
       res.render("cartorder",{user:req.session.user})
}
const cartOderPOST = async (req,res)=>{
    try{
        const { name, address, pincode, mobile, paymentMethod } = req.body;
        const user = req.session.user;
        let result = await ProductService.cartOderPOST(user,{ name, address, pincode, mobile, paymentMethod})
        if(result){
            res.redirect("/orders")
        }
    }catch(error){

    }
}
const viewOrders = async (req,res)=>{
    let orders = await ProductService.viewOrders(req,res)
    res.render("orders",{orders,user:req.session.user})
}

const viewOrderDetails = async (req,res) =>{
    try{
        const order = await ProductService.viewOrderDetails(req,res);
        res.render('orderDetails', { order,user:req.session.user});
    }catch(error){
        console.log(error)
    }
}


const ProductControllers = {
    // admin 
    newProductGet,
    newProductPost,
    editProductPage,
    updateProduct,
    deleteProductDB,
    // user
    cartBox,
    addCart,
    cartUpdate,
    removeFromCart,
    orderProduct,
    cartOderPOST,
    viewOrders,
    viewOrderDetails
}


module.exports = {ProductControllers}