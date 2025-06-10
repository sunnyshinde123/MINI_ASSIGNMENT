const jwt=require("jsonwebtoken");

async function setUser(user){ //generate token 
  return jwt.sign({       
    id:user._id,
    email:user.email,
    username: user.username
  }, process.env.SECRET_KEY)
}

async function getUser(token) { //verify token that place on the user browser as cookies
  if(!token) return null;
  try{
    return jwt.verify(token, process.env.SECRET_KEY);
  }catch(err){
    return err;
  }
}

module.exports={
  setUser,
  getUser
}