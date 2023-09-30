const express= require("express")
const {AuthenticationMiddleware}= require("./middleware")
const cookieParser = require('cookie-parser')
const {createProxyMiddleware} = require('http-proxy-middleware');
const {router}= require("./routes")
const {rateLimiter,ServerPort}= require("./config")
const {ProxyHelper}= require("./util/common")




const app= express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(rateLimiter)



app.use('/booking', [AuthenticationMiddleware.tokenValidate],createProxyMiddleware({ target: `${ServerPort.BOOKING_SERVICE_URL}`, changeOrigin: true ,pathRewrite: {'^/booking' : '/'},onProxyReq:ProxyHelper.proxyHelper,secure:true}));
app.use('/data',[AuthenticationMiddleware.tokenValidate,AuthenticationMiddleware.isAdmin],createProxyMiddleware({ target: `${ServerPort.DATA_SERVICE_URL}`, changeOrigin: true ,pathRewrite: {'^/data' : '/'},onProxyReq:ProxyHelper.proxyHelper,secure:true}));
// app.use('/data', [AuthenticationMiddleware.tokenValidate,AuthenticationMiddleware.isAdmin],createProxyMiddleware({ target: `${ServerPort.DATA_SERVICE_URL}`, changeOrigin: true ,onProxyReq:ProxyHelper.proxyHelper,secure:true}));
app.use("/api",router)



app.listen(ServerPort.MAIN_PORT,()=>{
    console.log(`Server STarted on Port ${ServerPort.MAIN_PORT}`)
})




// async function test(){
//     const users= await user.findByPk(1)
//     const roles= await role.findByPk(2)
//     users.addRole(roles)
// }
// test()

// async function test(){
//     const validEmail= await userData.findOne({where:{emailId:"andomuser@gmail.com"}})
//     if(!validEmail){
//         console.log("not fouun=d")
//     }

//     // console.log(validEmail.dataValues.password)
//     // const response= await userData.create({name:"Archit",emailId:"randomuser@gmail.com",password:"HEllo"})
//     // console.log(response)
//     // console.log(user)
//     // console.log(created)
// }
// test()













