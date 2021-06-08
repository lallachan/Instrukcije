const {userAuth,Instruktor} = require("../models/User_Auth")


 const SetLandingInstructors=  async  ()=> {
   
    return
    const users = await Instruktor.find({})
    
}

exports.midnightFunction = async ()=>{
    console.log("Middnight")
    try {
        // ?  1.
        await CheckIfEmailTimeExpired()
        // ?  2.
        await SetLandingInstructors()



    } catch (error) {
        console.log(error)
    }
}

const CheckIfEmailTimeExpired= async()=>{
    try{
        const users = [...await userAuth.find({}),...await Instruktor.find({})]
      
        let unVerifedUsers=  users.filter(u=> u.emailVerifed == 'false')
        

        unVerifedUsers=  unVerifedUsers.filter(u=>{
            const timeDiff = new Date() - new Date(u.date)
            const oneDay = 60*60*24*1000 //! SET ENOUGHT TIME
            if(timeDiff > oneDay){
             return u
            }

        })

        userAuth.findByIdAndDelete(unVerifedUsers).save()


    }catch(err){
        console.log(err)
    }

}

