
const isAdminLogin=(req,res,next)=>{
    if (req.session.adminLoggedIn && req.session.user.role == 'admin'){
        next();
    }else{
        res.redirect("/admin/login");
    }
}



const isLogin = (req,res,next)=>{
    if (req.session.loggedIn){
        next();
    }else{
        res.redirect("/login");
    }
}


module.exports = {isLogin,isAdminLogin};