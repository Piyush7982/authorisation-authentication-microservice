const crud= require("./crud-repository")
const {userData}= require("../models");
const CustomError = require("../util/errors");
const { StatusCodes } = require("http-status-codes");
class authenticationRepository extends crud{
    constructor(){
        super(userData)
        
    }
    async findOne(data){
        try {
            const response= await this.model.findOne({ where: data })
            return response
        } catch (error) {
            throw new CustomError(error.message,StatusCodes.NOT_FOUND)
        }
    }

    async signupAuthenticate(data){
       try {
        const {emailId,name,password} = data
        const [user, created] = await userData.findOrCreate({
            where: { emailId:emailId },
            defaults: {name:name, password:password },
          });
        if(!created){
            throw new CustomError(`User Already created for the following email: ${emailId}`,StatusCodes.BAD_REQUEST)
        }
        return `User Created Succcesfully for the following email: ${emailId}`
       } catch (error) {
            throw error
       }
    }
}
module.exports=authenticationRepository