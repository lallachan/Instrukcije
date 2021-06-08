const express = require("express")
const path = require('path')
const app = express()
const hbs = require('hbs')




const mongoose = require("mongoose")
const dotenv = require("dotenv").config({path:'./config/.env'})
const cors = require("cors")
const schedule = require("node-schedule")


const {midnightFunction } = require('./functions/ServerFunctions')

const connect_to_DB = require('./config/db')

//DB_CONNECT
connect_to_DB()


//import Route
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const ladingRoute = require('./routes/landing')
const searchRoute = require('./routes/search')



// router Middlewares
app.use(express.urlencoded({ extended: true })); //maybe someday
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())
app.set('view engine', 'hbs')

app.use('/api/userAuth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/landing',ladingRoute)
app.use('/api/search',searchRoute)

app.get("/",(req,res)=>{
    res.send("UP")
})
schedule.scheduleJob('0 0 * * *',midnightFunction) 

app.listen(process.env.PORT || 5000, async ()=>{

})

