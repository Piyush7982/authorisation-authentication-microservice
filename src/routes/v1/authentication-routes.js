const express= require("express")
const {AuthencationController}= require("../../controller")
const router= express.Router()
router.post("/login",AuthencationController.login)
router.post("/signup",AuthencationController.signup)

module.exports={AuthencationRouter:router}