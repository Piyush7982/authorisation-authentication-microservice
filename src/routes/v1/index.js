const express= require("express")
const {infoController}= require('../../controller')
const {AuthencationRouter}= require("./authentication-routes")
const{AuthenticationMiddleware}= require("../../middleware")
const router= express.Router()
router.use("/info",AuthenticationMiddleware.tokenValidate,infoController)
router.use("/user",AuthencationRouter)


module.exports={V1routes:router}