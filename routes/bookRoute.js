const express = require("express");

const {
  handleGetBooks,
  handleNewBook,
  handleGetBooksDetails,
  handleNewCreateBook,
} = require("../controllers/bookController");

const router = express.Router();

router.route("/").get(handleGetBooks).post(handleNewCreateBook);

router.get("/new", handleNewBook);

router.get("/:id", handleGetBooksDetails);

module.exports = router;
