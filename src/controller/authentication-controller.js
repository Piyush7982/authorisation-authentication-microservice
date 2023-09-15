const {AuthenticationService}= require("../services")
const {SuccessResponse,ErrorResponse}= require("../util/common")

async function signup(req,res){
    try {
        const response= await AuthenticationService.signupAuthenticate({emailId:req.body.emailId,name:req.body.name, password:req.body.password})
        SuccessResponse.Data=response
        SuccessResponse.Message="succesfully created"
        return res.json(SuccessResponse)
        
    } catch (error) {
        
        res.json({
            status:"failed",
            error:"",
            comment:"failed to  create user",
            
        })
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
        
        res.json({
            status:"failed",
            error:"",
            comment:"failed to  find user",
            
        })
        throw error
    }
}
const authenticationController={signup,login}
module.exports=authenticationController