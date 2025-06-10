const express=require("express");
const connectToDb=require("./config/connection");
const path=require("path");
const userRouter=require("./routes/loginRoute");
const bookRouter=require("./routes/bookRoute");
const cookieParser = require('cookie-parser')
const {restrictUserfromBooks}=require("./middleware/auth")
const reviewRouter=require("./routes/reviewRoute");
const { getUser } = require("./services/auth");
const methodOverride = require('method-override')
require("dotenv").config();

const app=express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());
app.use(methodOverride('_method'));

connectToDb(process.env.MONGO_URL).then(()=> console.log("DB Connected")).catch((err)=> console.log(err));

app.use(async(req, res, next)=>{
    let token=req.cookies.uid;
    let user=await getUser(token);
    res.locals.currUser=user; //set the local variable to access in ejs template
    next();
})

app.get("/", (req, res)=>{
  res.render("index.ejs");
})

app.use("/", userRouter);
app.use("/books", restrictUserfromBooks, bookRouter);
app.use("/", restrictUserfromBooks, reviewRouter);

app.listen(process.env.PORT || 8000, ()=> console.log(`Server is listining`));
