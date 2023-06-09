const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()


// const port = 4000;
const port = process.env.PORT || 4000

const router = require('./src/routes/loansRouter');
const booksRouter = require('./src/routes/booksRouter')
const membersRouter = require('./src/routes/members.Routes')
const userRouter = require('./src/routes/userRouter');

app.use(express.json());
app.use(cors());


app.use('/members', membersRouter);
app.use('/users', userRouter)
app.use('/', router);
app.use('/books', booksRouter);;
// Register the user routes
// app.use('/users', userRoutes);
// Register the books routes
// app.use('/books', router);


app.get('/', (req, res) => {
    res.send('OK')
})

//handles undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: "Not found"
    })
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})