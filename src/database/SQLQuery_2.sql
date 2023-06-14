USE Library;

-- - Trigger to update the "Status" column in the "Books" table
-- CREATE TRIGGER UpdateBookStatus
-- ON Books
-- AFTER UPDATE
-- AS
-- BEGIN

-- IF UPDATE(Status)
-- BEGIN

-- UPDATE Books
-- SET Status = CASE WHEN New.Status = 'Loaned' THEN 'Loaned' ELSE 'Available' END
-- FROM Books AS Old
-- INNER JOIN Inserted AS New
-- ON Old.BookID = New.BookID;

-- END;

-- END;


-- CTE to retrieve the names of members who have borrowed at least three books

-- WITH BorrowedBooks AS (
--   SELECT MemberID, COUNT(*) AS NumBorrowedBooks
--   FROM Loans
--   GROUP BY MemberID
 
-- )
-- SELECT Members.Name
-- FROM Members
-- JOIN BorrowedBooks ON Members.MemberID = BorrowedBooks.MemberID
-- WHERE BorrowedBooks.NumBorrowedBooks >= 3;



-- User-defined function to calculate the overdue days for a given loan
-- CREATE FUNCTION CalculateOverdueDays
-- (
--     @LoanID INT
-- )
-- RETURNS INT
-- AS
-- BEGIN

-- DECLARE @LoanDate DATETIME,
--         @ReturnDate DATETIME,
--         @CurrentDate DATETIME;

-- SELECT @LoanDate = LoanDate,
--        @ReturnDate = ReturnDate,
--        @CurrentDate = GETDATE()
-- FROM Loans
-- WHERE LoanID = @LoanID;

-- DECLARE @OverdueDays INT;

-- SET @OverdueDays = DATEDIFF(day, @LoanDate, @CurrentDate) - DATEDIFF(day, @LoanDate, @ReturnDate);

-- RETURN @OverdueDays;

-- END;




-- View to display details of all overdue loans:
-- CREATE VIEW OverdueLoans
-- AS
-- SELECT
--     Books.Title,
--     Members.Name,
--     CalculateOverdueDays(LoanID) AS OverdueDays
-- FROM
--     Books
-- INNER JOIN
--     Loans
-- ON
--         Books.BookID = Loans.BookID
-- INNER JOIN
--     Members
-- ON
--         Loans.MemberID = Members.MemberID
-- WHERE
--     DATEDIFF(day, LoanDate, GETDATE()) > DATEDIFF(day, LoanDate, ReturnDate);



-- Trigger to prevent a member from borrowing more than three books
-- CREATE TRIGGER PreventMemberFromBorrowingTooManyBooks
-- ON Loans
-- AFTER INSERT
-- AS
-- BEGIN

-- DECLARE @MemberID INT;

-- SELECT @MemberID = MemberID
-- FROM inserted;

-- DECLARE @BookCount INT;

-- SELECT @BookCount = COUNT(LoanID)
-- FROM Loans
-- WHERE MemberID = @MemberID;

-- IF @BookCount > 3
-- BEGIN

-- RAISERROR('Member cannot borrow more than three books at a time.', 16, 1);

-- ROLLBACK TRANSACTION;

-- END;

-- END;

