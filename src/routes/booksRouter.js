const {getAllBooks, getBookById} = require ('../controllers/booksController')
// , getSalesPerYear

const express = require('express')

const router = express.Router()

router.get('/books', getAllBooks)
router.get('/books/:book_id', getBookById)

// router.get('products/sales/:page/:limit/:year', getSalesPerYear)


module.exports =router
