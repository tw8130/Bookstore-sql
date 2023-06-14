const express = require('express')

require('dotenv').config()
const app = express()

app.use(express.json())


app.get('/', (req, res)=>{
     res.send("Ok")
    
})

const router = require('./src/routes/booksRouter')
const port = process.env.PORT || 4000
app.use('/', router)
app.listen(port, ()=>console.log(`Server on port ${port}`))