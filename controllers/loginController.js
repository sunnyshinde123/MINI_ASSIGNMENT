const User=require("../models/user");
const {setUser}=require("../services/auth");

async function handleGetLoginPage(req, res){
  res.render("user/login.ejs");
}

async function handleLoginUser(req, res){
 let {email, password}=req.body;
   let user=await User.findOne({email, password});
   if(!user){
     return res.redirect("/login");
   }
   const token=await setUser(user);
   res.cookie("uid", token);
   res.redirect("/"); 
}

async function handleGetSignupPage(req, res){
  res.render("user/signup.ejs");
}

async function handleSignupUser(req, res){
  if(!req.body){
      return res.send("Something went wrong");
    }
    let {email}=req.body;
    let getUser=await User.findOne({email});
    if(!getUser){
      let newUser=await User.create({...req.body});
      const token=await setUser(newUser);
      res.cookie("uid", token);
      return res.status(201).redirect("/");
    }
    res.redirect("/login");
}

async function handleLogoutUser(req, res){
  let userId=req.cookies.uid;
  console.log(userId);
  if(userId){
    res.clearCookie("uid");
  }
  res.redirect("/");
}

module.exports={
  handleGetLoginPage,
  handleLoginUser,
  handleGetSignupPage,
  handleSignupUser,
  handleLogoutUser
}