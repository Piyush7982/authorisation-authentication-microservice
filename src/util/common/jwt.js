const jwt = require("jsonwebtoken");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
 function tokenGenerate(data){
    try {
        const {id,emailId}= data
        const token =  jwt.sign({ id: id , emailId:emailId}, 'UZUmaki23NAruto');
        return token
    } catch (error) {
        throw error
    }
}

 function tokenVerify(token){
    try {
        var decoded =  jwt.verify(token, 'UZUmaki23NAruto')
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