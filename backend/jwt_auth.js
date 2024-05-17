import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

function JWT_Auth(req, res, next){
    const token = req.headers.jwt 
    if(token !== null) {
        jwt.verify(token, process.env.JWT_KEY, (err, mail) => {
            if(!err){
                req.email= mail.email
                next()
            }
            else return(res.send("not ok"))
        })
    }
    else return(res.send("not ok"))
}

export default JWT_Auth 