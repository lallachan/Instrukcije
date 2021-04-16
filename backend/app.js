const express = require("express")
const path = require('path')
const app = express()



const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")


const {SetLandingInstructors } = require('./functions/ServerFunctions')
const Instruktor_Landing = require("./models/Instruktor_Landing")

console.log("Hey")

//DB_CONNECT
mongoose.connect(process.env.DB_CONNECT,{useUnifiedTopology: true ,useNewUrlParser: true},(msg)=>{

    if(msg) console.log(msg)
 })


//import Route
const authRoute = require('./routes/auth')
const ladingRoute = require('./routes/landing')



// router Middlewares
app.use(express.urlencoded({ extended: true })); //maybe someday
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())


app.use('/api/user',authRoute)
app.use('/api/landing',ladingRoute)

app.get("/",(req,res)=>{
    res.send("UP")
})

app.listen(process.env.PORT || 5000, async ()=>{
    try{
        const instruktors = await Instruktor_Landing.find({})
        if (instruktors.length===0 || instruktors === null) SetLandingInstructors()
    }catch(err){
        console.log(err)
    }
   
   
})

