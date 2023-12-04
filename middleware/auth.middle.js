const jwt=require('jsonwebtoken')

function auth(req,res,next){
    const token=req.headers.authorization?.split(' ')[1]
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userName=decoded.userName
                req.body.userId=decoded.userId
                next()
            }else{
                res.send({"error":"not authorized"})
            }
        })
    }else{
        res.send({"msg":"please login"})
    }

}

module.exports={auth}