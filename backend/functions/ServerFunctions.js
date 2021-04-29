const {userAuth,Instruktor} = require("../models/User_Auth")


exports.SetLandingInstructors=  async  ()=> {
    //TODO TAKE ONLY INSTRUCTORS
    const users = await Instruktor.find({})
    users.forEach(user =>{
        
       

        user.save()
    })
}

