const mongoose = require("mongoose");
const Book = require("./bookModel");

describe("book model", () => {
  beforeAll(() => {
    return mongoose.connect("mongodb://localhost/book_collection");
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

  it("", async () => {
    const book = { author: "James Patterson", genre: "mystery", pages: 354 };

    const savedBook = await Book.create(book);

    expect(savedBook.author).toEqual(book.author);
  });
});
