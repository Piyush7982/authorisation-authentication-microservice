const { StatusCodes } = require("http-status-codes")
const{ AuthenticationRepository}= require("../repositoties")
const CustomError = require("../util/errors")
const {passAuth}= require("../config")
const {Token}= require("../util/common")




const authenticate= new AuthenticationRepository()
async  function signupAuthenticate(data){
    try {
        const signup= authenticate.signupAuthenticate(data)
        return signup
    } catch (error) {
        throw error
    }
    
}
async function loginAuthenticate(data){
    try {
        const {emailId,password} = data
        const isValid= await authenticate.findOne({emailId:emailId})
    // const validEmail= await userData.findOne({ where: { emailId: emailId } })
        if(!isValid){
            throw new CustomError("Wrong Email Id entered",StatusCodes.BAD_REQUEST)
        }
        const isValidPassword=await passAuth.verifyPassword(password,isValid.dataValues.password)
        
        if(isValidPassword==false){
            throw new CustomError("Wrong Password entered",StatusCodes.BAD_REQUEST)
        }
        //assign token
        const token=Token.tokenGenerate(isValid.dataValues)
        return {token:token,message: "Login Successful, User Loggedin"}
        
    } catch (error) {
        throw error
    }

}


const authenticationService={signupAuthenticate,loginAuthenticate}
module.exports=authenticationService