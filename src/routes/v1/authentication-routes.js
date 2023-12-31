const express= require("express")
const {AuthencationController}= require("../../controller")
const {AuthenticationMiddleware}= require("../../middleware")

const router= express.Router()
router.post("/login",AuthencationController.login)
router.post("/signup",AuthencationController.signup)
router.put("/",AuthenticationMiddleware.tokenValidate,AuthenticationMiddleware.isAdmin,AuthencationController.assignRole)
router.post("/logout",AuthencationController.logout)




module.exports={AuthencationRouter:router}