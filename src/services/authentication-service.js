const { StatusCodes } = require("http-status-codes")
const{ AuthenticationRepository}= require("../repositoties")
const CustomError = require("../util/errors")
const {passAuth}= require("../config")
const {Token}= require("../util/common")

const{RoleRepository}= require("../repositoties")
const roles= require("../util/common/enums")
const{MASTER_ADMIN,THEATRE_ADMIN,USER}= roles


const roleRepo= new RoleRepository()

const authenticate= new AuthenticationRepository()
async  function signupAuthenticate(data){
    try {
        const user= authenticate.signupAuthenticate(data)

        
        return user
    } catch (error) {
        throw error
    }
    
}
async  function rollAssign(data){
    try {
        const user= await signupAuthenticate(data)
        // const isValid= await authenticate.findOne({emailId:data.emailId})
        // const id =isValid.dataValues.id
        // const users= await user.findByPk(id)
        const roles= await roleRepo.getRoleByName(USER)
        user.addRole(roles)
        // const roles = await roleRepo.getRoleByName(USER);
        // await users.addRole(roles)

        
        return `User created for the following email :${data.emailId}}`
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



async function changeRole(data){
    try {
        const {emailId , roleId}= data
        const isValid= await authenticate.findOne({emailId:emailId})
        if(!isValid){
            throw new CustomError("Wrong  Email entered",StatusCodes.BAD_REQUEST)
        }
        const validRole= await roleRepo.find(roleId)
        if(!validRole){
            throw new CustomError("Wrong  roleId entered",StatusCodes.BAD_REQUEST)
        }
        if( await isValid.hasRole(validRole)){
            throw new CustomError("Role Already Assigned",StatusCodes.BAD_REQUEST)
        }
        const role = validRole.dataValues.role
        await isValid.addRole(validRole)
         
        return `Assigned ${role} Role to user ${isValid.dataValues.emailId}`
    } catch (error) {
        throw error
    }
}

async function isAdmin(emailId){
    try {
        const isValid= await authenticate.findOne({emailId:emailId})
        if(!isValid){
            throw new CustomError("Wrong  Email entered",StatusCodes.BAD_REQUEST)
        }
        const role =await roleRepo.getRoleByName(MASTER_ADMIN)
        if( await isValid.hasRole(role)){
            return true
        }else{
            throw new CustomError("You are not authorized to do this",StatusCodes.UNAUTHORIZED)
        }
    } catch (error) {
        throw error
    }
}

const authenticationService={loginAuthenticate,rollAssign,isAdmin,changeRole}
module.exports=authenticationService