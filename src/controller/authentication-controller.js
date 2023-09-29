const { StatusCodes } = require("http-status-codes")
const {AuthenticationService}= require("../services")
const {SuccessResponse,ErrorResponse}= require("../util/common")
const CustomError = require("../util/errors")

async function signup(req,res){
    try {
        const response= await AuthenticationService.rollAssign({emailId:req.body.emailId,name:req.body.name, password:req.body.password})
        SuccessResponse.Data=response
        SuccessResponse.Message="succesfully created"
        return res.json(SuccessResponse)
        
    } catch (error) {
        
        ErrorResponse.Error=error
        res
        .status(error.statusCode)
        .json(ErrorResponse)
        
        throw error
    }
}
async function assignRole(req,res){
    try {
        const response= await AuthenticationService.changeRole({emailId:req.body.emailId,roleId:req.body.roleId})
        SuccessResponse.Data=response
        SuccessResponse.Message="succesfully created"
        return res.json(SuccessResponse)
        
    } catch (error) {
        
        ErrorResponse.Error=error
        res
        .status(error.statusCode)
        .json(ErrorResponse)
        
        throw error
    }
}
async function login(req,res){
    try {
        const response= await AuthenticationService.loginAuthenticate({emailId:req.body.emailId, password:req.body.password})
        // res.header("x-access-token", response.token);
        res.cookie("access_token", response.token)
        
        SuccessResponse.Data=response.message
        SuccessResponse.Message="succesfully found"
        return res.json(SuccessResponse)
        
    } catch (error) {
        
        ErrorResponse.Error=error
        res
        .status(error.statusCode)
        .json(ErrorResponse)
        
        throw error
    }
}
async function logout(req,res){
    try {
        if(req.cookies.access_token){
            res.clearCookie("access_token");
            SuccessResponse.Data="User Logged Out"
            SuccessResponse.Message="succesfully found"
            return res.json(SuccessResponse)
        }
        else{
            throw new CustomError("user Already LoggedOut",StatusCodes.BAD_REQUEST)
        }
        
        
    } catch (error) {
        
        ErrorResponse.Error=error
        res
        // .status(error.statusCode)
        .json(ErrorResponse)
        
        throw error
    }
}
const authenticationController={signup,login,assignRole,logout}
module.exports=authenticationController