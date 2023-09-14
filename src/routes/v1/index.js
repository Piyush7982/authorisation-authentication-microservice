const express= require("express")
const {infoController}= require('../../controller')
const {AuthencationRouter}= require("./authentication-routes")
const router= express.Router()
router.use("/info",infoController)
router.use("/user",AuthencationRouter)


module.exports={V1routes:router}