const { getAllBooks, getBookById, createNewBook } = require('../controllers/booksController')
const { authenticateToken } = require('../middlewares/auth');


const express = require('express')

const booksRouter = express.Router()

booksRouter.get('/books', getAllBooks)

booksRouter.use(authenticateToken)
booksRouter.get('/books', getBookById)


booksRouter.post('/books', createNewBook)
    // Route for getting all books (requires authentication)


booksRouter.get('/', getAllBooks);




module.exports = booksRouter