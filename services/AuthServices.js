

const {UserModel} = require("../models/schema");
const {Encry} = require("../utils/encryptionUtils")

const {ADMIN_USERNAME,ADMIN_PWD} = require('../config/config')



const newUser = async (req,res) => {
    try{
        const { email,username,password } = req.body;
        const hashedPassword = await Encry.hashPwd(password);
        const newUser = new UserModel({email,username,password:hashedPassword}); 
        await newUser.save();
        req.session.loggedIn = true;
        req.session.user = newUser; 
        res.redirect('/');    
    }catch(error){
        res.status(401).json({ error: error.message });
    }
};

const UserLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        let key = false;
        let error = false
        if (user) {
            key = await Encry.comparePwd(password, user.password);
        }
        if(key){
            console.log("Login Successful");
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        }else{
            res.status(401);
            return res.render('login', { error: "Invalid username or password" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const UserLogout = (req,res) =>{
    req.session.destroy((err)=>{
        res.redirect("/")
    })
}

const doAdminLogin = (req,res) =>{
    try{
        console.log("here.......")
        const { username, password } = req.body;
        if (username == ADMIN_USERNAME && password == ADMIN_PWD){
            req.session.user = { username, role: 'admin' };
            req.session.adminLoggedIn = true
            res.redirect("/admin")
        }else{
            res.status(401);
            res.render('admin/adminLogin', { error: "Invalid username or password" });
        }
    }catch(error){
       console.log("error")
    }
}



const AuthServices = {
    newUser,
    UserLogin,
    UserLogout,
    doAdminLogin
}



module.exports = {AuthServices}

