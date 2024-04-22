import jwt from 'jsonwebtoken'

export const verifyUser = (req,res,next)=>{
    const {access_token} = req.cookies;
    // console.log(access_token);
    if(!access_token)
    {
        return res.status(401,'Invalid token')
    }
    jwt.verify(access_token,'jwt-secrets',(err,user)=>{
        if(err)
        {
            return res.status(401,'unauthorized')
        }
        req.user = user;
        // console.log("user",req.user);
        next();
    })
}