const jwt = require('jsonwebtoken')
require('dotenv').config();

class Middleware {
    check(req, res, next) {
        console.log('Request to middleware')
        res.locals.view = 9
        next();
    }
    authenticate(req, res, next) {
        const secretKey = process.env.SECRET_KEY
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: "you are not authorized" })
        } else {
            jwt.verify(token, secretKey, (error, user) => {
                if (error) {
                    res.status(403).json({ error: error })
                } else {
                    next()
                }

            })
        }
        // console.log(token)
    }
}
module.exports = new Middleware
