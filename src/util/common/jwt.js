const jwt = require("jsonwebtoken");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
require('dotenv').config()

 function tokenGenerate(data){
    try {
        const {id,emailId}= data
        const token =  jwt.sign({ id: id , emailId:emailId}, `${process.env.TOKEN_GENERATE_KEY}`);
        return token
    } catch (error) {
        throw error
    }
}

 function tokenVerify(token){
    try {
        var decoded =  jwt.verify(token, `${process.env.TOKEN_GENERATE_KEY}`)
        if(!decoded){
            throw new CustomError("Not a Valid Token",StatusCodes.INTERNAL_SERVER_ERROR)
        }
        
        return decoded
    } catch (error) {
        throw error
    }
}


module.exports={
    tokenGenerate,tokenVerify
}