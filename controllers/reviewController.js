const Book=require("../models/book");
const Review=require("../models/review");

//create a new review
async function handleReviewCreate(req, res){
  let bookId=req.params.id;
  let userId=await req.user.id;
  let book=await Book.findById(bookId);
  if(!book){
    return res.status(404).json({error:"Book not found"});
  }
  let existingReview=await Review.findOne({user: userId, book: bookId});
  if(existingReview){
    return res.status(400).json({error: "You have already reviewed this book"});
  }

  const newReview=await Review.create({
    user:userId,
    book:bookId,
    comment:req.body.comment,
    rating:req.body.rating
  })

  await newReview.save();

  book.reviews.push(newReview._id);
  await book.save();
  return res.redirect(`/books/${bookId}`);
}

//render the review edit form
async function handleGetReviewEditPage(req, res){
  let {reviewId, bookId}=req.params;
    let review=await Review.findById(reviewId);
    res.render("review/editReview.ejs", {review});
}

//update the existing review from the owner of that review
async function handleUpdateReview(req, res){
  try{
      let {bookId, reviewId}=req.params;
    let {comment, rating}=req.body;
    let {id}=req.user;
    let getReview=await Review.findById(reviewId);
    if (!getReview) {
              return res.status(404).json({ error: "Review not found" });
          }
    if(id==getReview.user){
      await Review.findByIdAndUpdate(reviewId, {comment, rating}, {new: true});
      return res.redirect(`/books/${bookId}`);
    }
    res.status(403).json({error:"you are not the authorized user to edit this review"});
    }catch(err){
      res.status(500).json({error:err.message});
    }
}

module.exports={
  handleReviewCreate,
  handleGetReviewEditPage,
  handleUpdateReview
}