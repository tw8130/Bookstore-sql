const express = require('express');
const { getMembersWhoBorrowed, getAMemberWhoBorrowed, returnBook, borrowBook, checkOverdueBooks } = require('../controllers/loansController');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');




router.use(authenticateToken)
router.post('/check-overdue-books', async(req, res) => {
    try {
        await checkOverdueBooks();
        res.status(200).json({ message: 'Overdue books checked successfully.' });
    } catch (error) {
        console.error('Error checking overdue books:', error);
        res.status(500).json({ error: 'An error occurred while checking overdue books.' });
    }
});
router.get('/members/books-borrowed', getMembersWhoBorrowed)
router.get('/member/book-borrow', getAMemberWhoBorrowed)
router.post('/return', returnBook);
router.post('/borrow', borrowBook);
// router.get('/', getBorrowedBook)



module.exports = router;