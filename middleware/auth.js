let { getUser } = require("../services/auth");

//authentication middleware to verify the user is logged in or not before performing any action

async function restrictUserfromBooks(req, res, next) {
  
  let userId = req.cookies.uid;
  if (!userId) {
    return res.redirect("/login");
  }

  let user = await getUser(userId);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

module.exports = {
  restrictUserfromBooks,
};
