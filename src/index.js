const express= require("express")
const {AuthenticationMiddleware}= require("./middleware")
const cookieParser = require('cookie-parser')
const {createProxyMiddleware} = require('http-proxy-middleware');
const {router}= require("./routes")
const {rateLimiter}= require("./config")
const app= express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(rateLimiter)

const query= require("querystring")
function fun(ProxyReq,req,res){
    ProxyReq.write( query.stringify(req.body))
    return
   

}
app.use('/booking', [AuthenticationMiddleware.tokenValidate],createProxyMiddleware({ target: 'http://localhost:4001/api/v1/booking', changeOrigin: true ,pathRewrite: {'^/booking' : '/'},onProxyReq:fun,secure:true}));


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













