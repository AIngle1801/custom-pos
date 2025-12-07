const jwt = require('jsonwebtoken')

function adminMiddleware(req,res, next){
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({'msg':'token not found'})
        }
        const jwtToken = token.split(" ")[1]
        const decodedValue = jwt.verify(jwtToken, "Arjun@1801")
        if(decodedValue.username && decodedValue.role=="admin"){
            req.username= decodedValue
            next()
        }else{
            return res.status(403).json(
                {
                    'msg':'you are not authorized'
                }
            )
        }

    }catch(error){
        console.error('Admin middleware error:', error.message)
        return res.status(401).json({
            'msg':'Invalid or expired token'
        })
    }

} 

module.exports = adminMiddleware;