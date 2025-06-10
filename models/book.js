const mongoose=require("mongoose");
const Review=require("./review");

const bookSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique: true
  },
  author:{
    type:String,
  },
  genre:{
    type:String
  },
  reviews:[{type: mongoose.Schema.Types.ObjectId, ref: Review}]
}, {timestamps:true})

const Book=mongoose.model("Book", bookSchema);

module.exports=Book;