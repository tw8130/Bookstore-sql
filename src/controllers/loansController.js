const express = require('express');
const mssql = require('mssql')
const config = require('../config/config');

// Get a list of members who have borrowed a book

async function getMembersWhoBorrowed(req, res) {

    try {

        let sql = await mssql.connect(config);

        if (sql.connected) {

            let results = await sql.request()

            .query(`

            WITH cte_books_borrowed (MemberID, Name)

            AS

            (

              SELECT

                Members.MemberID,

                Members.Name

              FROM Members

              INNER JOIN Loans

                ON Members.MemberID = Loans.MemberID

              GROUP BY Members.MemberID, Members.Name

             

            )

            SELECT * FROM cte_books_borrowed;

          `);



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

        const { MemberID, BookID } = req.body;




        await mssql.connect(config);




        // Check if the member has borrowed the book

        const loanQuery = `
  
        SELECT * FROM Loans WHERE MemberID = ${MemberID} AND BookID = ${BookID}
  
      `;

        const loanResult = await mssql.query(loanQuery);

        const loanExists = loanResult.recordset.length > 0;




        if (loanExists) {

            // Delete the loan record

            const deleteQuery = `
  
          DELETE FROM Loans WHERE MemberID = ${MemberID} AND BookID = ${BookID}
  
        `;

            await mssql.query(deleteQuery);




            // Update the book status to 'Available'

            const updateQuery = `
  
          UPDATE Books SET Status = 'Available' WHERE BookID = ${BookID}
  
        `;

            await mssql.query(updateQuery);




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
async function borrowBook(req, res) {
    const { MemberID, BookID } = req.body
    try {
        await mssql.connect(config);
        const request = new mssql.Request();
        request.input('MemberID', mssql.Int, MemberID);
        request.input('BookID', mssql.Int, BookID);
        const result = await request.execute('BorrowBookEndPoint');
        res.json(result.recordset[0].Status);
    } catch (error) {
        console.error(error);

        res.status(500).send('Internal server error');

    } finally {
        mssql.close();
    }
}






module.exports = { getMembersWhoBorrowed, returnBook, borrowBook }