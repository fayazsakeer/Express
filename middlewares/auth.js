import jwt from "jsonwebtoken";

let { verify } = jwt;

export default async function auth(req,res,next){
    try {
        let token = req.headers.authorization.split(" ")[1];
        console.log(token);
        let details = await verify(token,process.env.JWT_SECRET);
        req.user = details;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({msg : "forbiden"})
    }
}