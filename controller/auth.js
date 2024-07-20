
const {AuthServices} = require("../services/AuthServices");





const SignUp = (req,res) =>{
    if (req.session.loggedIn){
      res.redirect("/")
    }else{
      res.render("signup");
    }
};
const doSignUp = async (req,res) =>{
    await AuthServices.newUser(req,res);
}
const Login = (req,res) =>{
    if (req.session.loggedIn){
        res.redirect("/")
      }else{
        let error = false
        res.render("login",{error})
      }
    
};
const doLogin = (req,res) =>{
    AuthServices.UserLogin(req,res);
}
const doLogout = (req,res) =>{
    if (req.session.loggedIn){
        AuthServices.UserLogout(req,res);
      }else{
        res.redirect("/login")
      }

}

const adminLogin = (req,res)=>{
    res.render("admin/adminLogin",{error:false})
}

const doAdminLogin = (req,res)=>{
  AuthServices.doAdminLogin(req,res) ;
}

const doAdminLogout = (req, res) => {
  if (req.session.adminLoggedIn) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Error logging out');
      }
      res.redirect("/admin/login");
    });
  } else {
    res.redirect("/admin/login");
  }
}


const AuthControllers = {
    SignUp,
    doSignUp,
    Login,
    doLogin,
    doLogout,
    adminLogin,
    doAdminLogin,
    doAdminLogout
};

module.exports = {AuthControllers};