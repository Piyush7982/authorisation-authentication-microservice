const crud= require("./crud-repository")
const {user}= require("../models")
const CustomError = require("../util/errors");
const { StatusCodes } = require("http-status-codes");
class authenticationRepository extends crud{
    constructor(){
        super(user)
        
    }
    async findOne(data){
        try {
            const response= await user.findOne({ where: data })
            return response
        } catch (error) {
            throw new CustomError(error.message,StatusCodes.NOT_FOUND)
        }
    }

    async signupAuthenticate(data){
       try {
        const {emailId,name,password} = data
        const [users, created] = await user.findOrCreate({
            where: { emailId:emailId },
            defaults: {name:name, password:password },
          });
        if(!created){
            throw new CustomError(`User Already created for the following email: ${emailId}`,StatusCodes.BAD_REQUEST)
        }
        
        
        return users
       } catch (error) {
            throw error
       }
    }
}
// `User Created Succcesfully for the following email: ${emailId}`
module.exports=authenticationRepository