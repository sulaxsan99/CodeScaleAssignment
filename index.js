const express = require('express')
const dotenv = require('dotenv')
const DbConnection= require('./DbConnection')
const UserRoute= require('./routes/UserRoute')
dotenv.config();

const app = express();


app.use(express.json())

app.use('/api/',UserRoute)

DbConnection();
app.listen(8000 || process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`)
})