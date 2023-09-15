const express= require("express")
const cookieParser = require('cookie-parser')
const {router}= require("./routes")
const {rateLimiter}= require("./config")
const {userData,roleData}= require("./models")
const app= express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(rateLimiter)
app.get("/",(req,res)=>{
    res.send("Hello")
})
app.use("/api",router)

app.listen(3000,()=>{
    console.log("server started")
})

// async function test(){
//     const [user, created] = await userData.findOrCreate({
//         where: { emailId:"ArchitJ123@gmail.com" },
//         defaults: {name:"Archit Jain", password:"HEllo" },
//       });
//     // const response= await userData.create({name:"Archit",emailId:"randomuser@gmail.com",password:"HEllo"})
//     // console.log(response)
//     console.log(user)
//     console.log(created)
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

// const bcrypt = require('bcrypt');
// const {hash}= require("bcrypt")
// const saltRounds = 5;
// const myPlaintextPassword = 'ARCHIT';

// async function hel(){
//     const result=  await bcrypt.hash(myPlaintextPassword, saltRounds)
//     console.log(result)
//     const actual= await bcrypt.compare(myPlaintextPassword, result)
//     console.log(actual)

// }
// hel()









