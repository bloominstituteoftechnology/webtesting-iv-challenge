const bookController = require('../controllers/bookController');

module.exports = app => {
  app
    .route('/books')
    .get(bookController.getAllBooks)
    .post(bookController.addBook);

  app
    .route('/books/:id')
    .get(bookController.getBook)
    .put(bookController.updateBook)
    .delete(bookController.deleteBook);
};
