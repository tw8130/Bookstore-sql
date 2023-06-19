const { getAllBooks, getBookById, createNewBook } = require('../controllers/booksController')
const { authenticateToken } = require('../utilis/auth');


const express = require('express')

const booksRouter = express.Router()

booksRouter.get('/books', getAllBooks)

booksRouter.get('/books/:book_id', getBookById)
booksRouter.post('/books', createNewBook)
    // Route for getting all books (requires authentication)

booksRouter.use(authenticateToken)
booksRouter.get('/', getAllBooks);




module.exports = booksRouter