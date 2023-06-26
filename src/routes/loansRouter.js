const express = require('express');
const { getMembersWhoBorrowed, returnBook, borrowBook,checkOverdueBooks } = require('../controllers/loansController');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');




router.use(authenticateToken)
router.post('/check-overdue-books', async (req, res) => {
    try {
      await checkOverdueBooks();
      res.status(200).json({ message: 'Overdue books checked successfully.' });
    } catch (error) {
      console.error('Error checking overdue books:', error);
      res.status(500).json({ error: 'An error occurred while checking overdue books.' });
    }
  });
router.get('/members/books-borrowed', getMembersWhoBorrowed)
router.post('/return/:MemberID/:BookID', returnBook);
router.post('/borrow/:MemberID/:BookID', borrowBook);
// router.get('/', getBorrowedBook)



module.exports = router;