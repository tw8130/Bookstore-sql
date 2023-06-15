
const mssql = require('mssql')
const config = require('../config')

//when dealing with databases functions are async


// async function getSalesPerYear(req, res){

//     let {page, limit, year} = req.params
    
//     let sql = await mssql.connect(config)
//     if(sql.connected){
//        let results = await sql.request()
//          .input("_year" , Number(year))
//          .input("_limit" , Number(limit))
//          .input("_page" , Number(page))
//          .execute("sales.pagenated_sales")//provide name of procedure
//          res.json({

//                         success: true,
//                         message: "sales for year 2018" + year,
//                          results:{
//              metadata: {

//               page,
//               record: results.recordset.length
                 
// },
// data: results.recordset

// }
        
// }) 

// }
    
// }


async function  getBookById(req, res){
  
    let { book_id } = req.params
    let sql =await mssql.connect(config)

    if(sql.connected){

        let results = await sql.query(`SELECT * from dbo.Books where BookID = ${Number(book_id)}`)
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




async function getAllBooks(req, res){
  let sql =  await mssql.connect(config)
  if(sql.connected){

   let results = await sql.query(`SELECT * from dbo.Books  WHERE Status = 'Available'`)
   let products = results.recordset;
   res.json({
      success: true,
      message: "fetched products successfully",
      results: products
     
})
}else{

      res.status(500).send("Internal server error")
    
}

}





module.exports = {getAllBooks,  getBookById}


// , getSalesPerYear