const { StatusCodes } = require("http-status-codes")
const {Token,ErrorResponse} = require("../util/common")
const CustomError = require("../util/errors")
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

        next()
    } catch (error) {
        error instanceof CustomError
        ErrorResponse.Error=error
        res.send(ErrorResponse)
        throw error
    }


}

module.exports={tokenValidate}