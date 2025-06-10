const express = require("express");

const {
  handleReviewCreate,
  handleGetReviewEditPage,
  handleUpdateReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/books/:bookId/reviews/:reviewId/edit", handleGetReviewEditPage);

router.post("/books/:id/reviews", handleReviewCreate);

router.patch("/books/:bookId/reviews/:reviewId", handleUpdateReview);

module.exports = router;
