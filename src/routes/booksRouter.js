const {getAllBooks, getBookById, createNewBook} = require ('../controllers/booksController')
// , getSalesPerYear

const express = require('express')

const router = express.Router()

router.get('/books', getAllBooks)
router.get('/books/:book_id', getBookById)
router.post('/books', createNewBook)

// router.get('products/sales/:page/:limit/:year', getSalesPerYear)


module.exports =router
