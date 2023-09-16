const express= require("express")
const cookieParser = require('cookie-parser')
const { createProxyMiddleware } = require('http-proxy-middleware');
const {router}= require("./routes")
const {rateLimiter}= require("./config")
const {user,role}= require("./models")
const app= express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(rateLimiter)
app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use('/booking', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true ,pathRewrite: {'^/booking' : '/'}}));
app.use("/api",router)

app.listen(3000,()=>{
    console.log("server started")
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













