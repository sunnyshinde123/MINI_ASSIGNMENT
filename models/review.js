const mongoose=require("mongoose");
const Book=require("./book");
const User=require("./user");

const reviewSchema=new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    rating: {
      type: Number
    },
    comment: {
      type: String
    }
})

let Review=mongoose.model("Review", reviewSchema);

module.exports=Review;