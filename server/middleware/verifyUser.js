const express = require('express');
const app = express();
const JWT_SECRET = "krishkrish@123"
const jwt= require('jsonwebtoken')
async function verifyToken(req, res, next) {
    if (req.cookies.token_for_talkpal===undefined) {
        res.status(500).json({message:"Unauthorised access of user"})
    }
    else{
        try {
            const user =await jwt.verify(req.cookies.token_for_talkpal, JWT_SECRET);
            console.log("user",user)
            req.id = user.id;
            console.log("req.id",req.id)
            next();
        }catch(err){
            console.log(err)
            res.status(404).json({message:"Server Error"})
        }
    }
    
}

module.exports= verifyToken
