const mssql = require('mssql')
const config = require('../config/config')

//create new member

async function createNewMember(req, res) {

    try {

        const { MemberID, Name, Address, ContactNumber } = req.body;



        // Perform validation checks if needed



        // Connect to the database

        await mssql.connect(config);



        // Insert the new book into the "Books" table

        await mssql.query `

          INSERT INTO dbo.Members (MemberID, Name, Address, ContactNumber)

          VALUES (${MemberID}, ${Name}, ${Address}, ${ContactNumber})

        `;



        res.status(201).json({ message: 'Member added successfully' });

    } catch (error) {

        console.error(error);

        res.status(500).send('Internal server error');

    } finally {

        // Close the database connection

        mssql.close();

    }

}

async function getAllMembers(req, res) {

    let sql = await mssql.connect(config)

    if (sql.connected) {



        let results = await sql.query(`SELECT * from dbo.Members`)

        let products = results.recordset;

        res.json({

            success: true,

            message: "fetched products successfully",

            results: products



        })

    } else {



        res.status(500).send("Internal server error")



    }



}

async function getMemberById(req, res) {



    let { member_id } = req.params

    let sql = await mssql.connect(config)



    if (sql.connected) {



        let results = await sql.query(`SELECT * from dbo.Members where MemberID = ${Number(member_id)}`)

        let products = results.recordset[0];

        res.status(200).json({

            success: true,

            message: "fetched products successfully",

            results: products



        })

    } else {



        res.status(500).send("Internal server error")



    }

}


module.exports = { getMemberById, getAllMembers, createNewMember }