const Book=require("../models/book");


//get all books
async function handleGetBooks(req, res){
  try {
    let { page = 1, limit = 10, author, genre } = req.query;
    let query = {};
    if (author) query.author = new RegExp(author, "i"); //parse the author and genre with case insensitive
    if (genre) query.genre = new RegExp(genre, "i");
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    return res.render("book/book.ejs", { page, limit, books });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

//render the form for to create a new book
async function handleNewBook(req, res){
  return res.render("book/newBook.ejs");
}


//show full details about the book
async function handleGetBooksDetails(req, res){
  let { id } = req.params;
  let book = await Book.findById(id)
    .populate({
        path: "reviews",
        populate: { path: "user", select: "username" } 
    });
  if (!book) return res.status(404).json({ message: "Book not found" });
  const avgRating = book.reviews.length
    ? book.reviews.reduce((sum, review) => sum + review.rating, 0) /
      book.reviews.length
    : "No ratings yet";
  res.render("book/bookDetails.ejs", {
    book,
    avgRating,
    reviews: book.reviews,
  });
}

//save new created book into the db
async function handleNewCreateBook(req, res){
  let { title, author, genre } = req.body;
    let newBook = await Book.create({ title, author, genre });
    res.redirect("/books");
}

module.exports={
  handleGetBooks,
  handleNewBook,
  handleGetBooksDetails,
  handleNewCreateBook
}