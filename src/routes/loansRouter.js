const express = require('express');
const { getMembersWhoBorrowed, returnBook, borrowBook } = require('../controllers/loansController');
const router = express.Router();





router.get('/members/books-borrowed', getMembersWhoBorrowed)
router.post('/return/:MemberID/:BookID', returnBook);
router.post('/borrow/:MemberID/:BookID', borrowBook);
// router.get('/', getBorrowedBook)



module.exports = router;