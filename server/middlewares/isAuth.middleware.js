import jsw from "jsonwebtoken"
import { verifyToken } from "../utils/verifyToken";
export const isAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.statue(401).json({success : false, message : "NOt AUthenticated"});
        }
        const usedId = verifyToken()
    } catch (error) {
        return res.statue(401).json({success : false, message : "token is invalid or expired"});
    } 
}