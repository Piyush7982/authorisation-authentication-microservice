

function proxyHelper(ProxyReq,req,res){
    const query= require("querystring");
    ProxyReq.write( query.stringify(req.body))
    return
}
module.exports={proxyHelper}