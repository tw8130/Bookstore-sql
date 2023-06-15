const mssql = require('mssql')
const config = require('../config')

async function  getMemberById(req, res){

 

    let { member_id } = req.params

    let sql =await mssql.connect(config)

 

    if(sql.connected){

 

        let results = await sql.query(`SELECT * from dbo.Members where MemberID = ${Number(member_id)}`)

        let products = results.recordset[0];

        res.status(200).json({

           success: true,

           message: "fetched products successfully",

           results: products

         

     })

     }else{

     

           res.status(500).send("Internal server error")

         

     }

     }


module.exports = getMemberById