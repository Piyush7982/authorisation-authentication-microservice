const { StatusCodes } = require("http-status-codes")
const {Token,ErrorResponse} = require("../util/common")
const CustomError = require("../util/errors")
const {AuthenticationService} = require("../services")
function tokenValidate(req,res,next){
    try {
        const token = req.cookies.access_token
        // console.log(req.headers)
        if(!token){
            throw new CustomError("Token not found",StatusCodes.BAD_REQUEST)
        }
        const response =Token.tokenVerify(token)
       
        if(!response.id){
            throw new CustomError("User Not found", StatusCodes.INTERNAL_SERVER_ERROR)
        }
        req.user=response
        
        next()
    } catch (error) {
        error instanceof CustomError
        ErrorResponse.Error=error
        res.send(ErrorResponse)
        throw error
    }


}
async function isAdmin(req,res,next){
    try {
        emailId=req.user.emailId
        if(AuthenticationService.isAdmin(emailId)){
            next()
        }else{
           throw CustomError("you are not authorised",StatusCodes.UNAUTHORIZED) 
        }
        
    } catch (error) {
        error instanceof CustomError
        ErrorResponse.Error=error
        res.send(ErrorResponse)
        throw error
    }
}
module.exports={tokenValidate,isAdmin}