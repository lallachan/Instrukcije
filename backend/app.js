const express = require("express")
const app = express()

const mongoose = require("mongoose")
const dotenv = require("dotenv").config()





//DB_CONNECT
mongoose.connect(process.env.DB_CONNECT,{useUnifiedTopology: true ,useNewUrlParser: true},(msg)=>{
    if(msg) console.log(msg)
 })


//import Route
const authRoute = require('./routes/auth')


// router Middlewares
//app.use(express.urlencoded({ extended: true })); maybe someday
app.use(express.json())

app.use('/api/user',authRoute)



app.listen(process.env.PORT || 5000, ()=>{
    console.log("Port Change")
})

