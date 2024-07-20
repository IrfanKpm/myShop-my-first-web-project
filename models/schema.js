const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type : String,required : true,unique : true},
    username : { type : String,required : true,unique : true},
    password : {type : String,required : true,}
});

const ProductSchema = new Schema({
    name: { type: String,required: true,unique: true,},
    price: {type: Number,required: true,},
    image: {type: String,required: true,unique: true,},
    description: {type: String,required: true,unique: true,}
});

const CartSchema = new Schema({
    user : {type:Schema.Types.ObjectId,ref:'User',required:true},
    items: [{
        product : {type:Schema.Types.ObjectId,ref:'Product',required:true},
        quantity : {type:Number,required:true,default:1},
        _id : false
    }],
    totel : {type:Number,required:true,default:0}
});

const OrderSchema = new Schema({
    deliveryDetails: {
      name: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true },
      mobile: { type: String, required: true, trim: true }
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, enum: ['cash', 'online'], required: true },
    status: { type: String, enum: ['placed', 'pending', 'completed', 'failed'], default: 'pending' },
    products: [{
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 }
    }],
    totalAmount: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  // Update the updatedAt field on each save
OrderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  // Create Models
const UserModel = mongoose.model('User', UserSchema);
const ProductModel = mongoose.model('Product', ProductSchema);
const CartModel = mongoose.model('Cart', CartSchema);
const OrderModel = mongoose.model('Order', OrderSchema);
  
  // Export Models
module.exports = { UserModel, ProductModel, CartModel, OrderModel };