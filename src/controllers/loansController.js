const express = require('express');
const mssql = require('mssql')
const cron = require('node-cron')
const config = require('../config/config');
const {
    sendMailBorrowedBook,
    sendMailReturnBook,
  
} = require("../utilis/sendMail")


const sendEmailToBorrower = require("../utilis/sendMailCron")



// Get a list of members who have borrowed a book

async function getMembersWhoBorrowed(req, res) {

    try {

        let sql = await mssql.connect(config);

        if (sql.connected) {

            let results = await sql.request().execute('GetMembersWhoBorrowedBooks');

            res.status(200).json(results.recordset);

        } else {

            console.error('Error getting members with books borrowed: Connection not established.');

            res.status(500).json({ error: 'An error occurred while retrieving the data.' });

        }

    } catch (error) {

        console.error('Error getting members with books borrowed:', error);

        // Handle error

        res.status(500).json({ error: 'An error occurred while retrieving the data.' });

    } finally {

        mssql.close();

    }

}

// Endpoint to return a book
async function returnBook(req, res) {

    try {

        const { MemberID, BookID } = req.params;




        await mssql.connect(config);




        // Check if the member has borrowed the book

        const loanQuery = `
  
        SELECT * FROM dbo.Loans WHERE MemberID = ${MemberID} AND BookID = ${BookID}
  
      `;

        const loanResult = await mssql.query(loanQuery);

        const loanExists = loanResult.recordset.length > 0;




        if (loanExists) {

            // Delete the loan record

            const deleteQuery = `
  
          DELETE FROM dbo.Loans WHERE MemberID = ${MemberID} AND BookID = ${BookID}
  
        `;

            await mssql.query(deleteQuery);




            // Update the book status to 'Available'

            const updateQuery = `
  
          UPDATE dbo.Books SET Status = 'Available' WHERE BookID = ${BookID}
  
        `;

            await mssql.query(updateQuery);

            //crazy

            let sql = await mssql.connect(config);

            // Retrieve email and book title from Members and Books tables

            const emailResult = await sql.query(`SELECT * FROM dbo.Members WHERE MemberID = ${Number(MemberID)}`);
            const bookTitleResult = await sql.query(`SELECT * FROM dbo.Books WHERE BookID = ${Number(BookID)}`);

            const email = emailResult.recordset[0].Email;
            const bookTitle = bookTitleResult.recordset[0].Title;
            console.log(bookTitle)
            console.log(email)

            sendMailReturnBook(email, bookTitle);
            res.json({ message: 'Book returned successfully.' });

        } else {

            res.status(400).json({ message: 'The member has not borrowed the book.' });

        }

    } catch (error) {

        console.error(error);

        res.status(500).send('Internal server error');

    } finally {

        mssql.close();

    }

}

// Borrow a book
// async function borrowBook(req, res) {
//     const { MemberID, BookID } = req.body
//     try {
//         await mssql.connect(config);
//         const request = new mssql.Request();
//         request.input('MemberID', mssql.Int, MemberID);
//         request.input('BookID', mssql.Int, BookID);
//         const result = await request.execute('BorrowBookEndPoint');

//         sendMailBorrowedBook(email, bookTitle)

//         res.json(result.recordset[0].Status);
//     } catch (error) {
//         console.error(error);

//         res.status(500).send('Internal server error');

//     } finally {
//         mssql.close();
//     }
// }
async function borrowBook(req, res) {
    const { MemberID, BookID } = req.params;

    try {
        await mssql.connect(config);

        const request = new mssql.Request();

        request.input('MemberID', mssql.Int, MemberID);
        request.input('BookID', mssql.Int, BookID);

        const result = await request.execute('BorrowBookEndPoint');
        let sql = await mssql.connect(config);

        // Retrieve email and book title from Members and Books tables

        const emailResult = await sql.query(`SELECT * FROM dbo.Members WHERE MemberID = ${Number(MemberID)}`);
        const bookTitleResult = await sql.query(`SELECT * FROM dbo.Books WHERE BookID = ${Number(BookID)}`);

        const email = emailResult.recordset[0].Email;
        const bookTitle = bookTitleResult.recordset[0].Title;
        console.log(bookTitle)
        console.log(email)

        // Send the email
        sendMailBorrowedBook(email, bookTitle);

        res.json(result.recordset[0].Status);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    } finally {
        mssql.close();
    }
}

// Function to check overdue books and send reminder emails
async function checkOverdueBooks() {
    try {
        let sql = await mssql.connect(config);




        // Retrieve loans with overdue books
        const result = await sql.request().query(`
      SELECT Loans.LoanID, Loans.BookID, Loans.MemberID, Loans.LoanDate, Loans.ReturnDate, Members.Email
      FROM Loans
      INNER JOIN Members ON Loans.MemberID = Members.MemberID
      
    `);

//CRAZY STUFF///// WHERE CAST(GETDATE()AS DATE)

        for (const row of result.recordset) {
            const loanDate = row.LoanDate;
            const returnDate = row.ReturnDate;
            const currentDate = new Date().toISOString().split('T')[0];
            const remainingDays = Math.floor((new Date(returnDate) - new Date(currentDate)) / (1000 * 60 * 60 * 24));
            const overdueDays = Math.floor((new Date(currentDate) - new Date(returnDate)) / (1000 * 60 * 60 * 24));
            const charges = overdueDays * 50; // Assuming 50/= charge per overdue day

            console.log(row.Email)

            sendEmailToBorrower(row.Email, remainingDays, overdueDays, charges);
        }



        await sql.close();
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
    }
}



// Schedule the task to run every day at 1 PM
cron.schedule('0 13 * * *', () => {
    checkOverdueBooks();
});







//exporting modules
module.exports = { getMembersWhoBorrowed, returnBook, borrowBook, checkOverdueBooks}