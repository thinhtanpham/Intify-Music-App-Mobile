const jwt = require('jsonwebtoken')

module.exports = function authenticateToken(req, res, next){
    const authHeader= req.headers['authorization'];
    
    const token = authHeader.split(' ')[1]
    if( token == null ) return res.sendStatus(401) 
    jwt.verify(token,'bear.', (err,user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        console.log(user)
        next()    
    })
}


// module.exports= function generateToken(user) {
//     return jwt.sign(user, 'bear.', {expiresIn:'20s'})
//   }

 