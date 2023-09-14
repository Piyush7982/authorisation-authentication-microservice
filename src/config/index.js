const {PORT}=require("./server-config")
module.exports={
    ServerPort:PORT,
    passAuth:require("./hash-config")
}