const {PORT}=require("./server-config")
module.exports={
    ServerPort:PORT,
    passAuth:require("./hash-config"),
    rateLimiter:require("./rate-limiter")
}