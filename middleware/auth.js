const jwt = require("jsonwebtoken");

// middleware that checks for a valid JWT and attaches decoded payload to req.user
const verifyToken = (req, res, next) =>{
     const authHeader = req.headers.authorization;

     if(!authHeader){
        return res.status(401).json({message:"no token provided"});
     }
     const token = authHeader.split(" ")[1];
     try{
        const decoded = jwt.verify(token,"mysecretkey");
        // decoded contains { id, role, iat, exp }
        req.user = decoded;
        next();
     }catch(error){
        return res.status(401).json({message:"invalid token"});
     }
};

// higher-order middleware generator: only allow specific roles through
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            // should not happen if verifyToken is used earlier
            return res.status(401).json({ message: "Unauthenticated" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = { verifyToken, authorizeRoles };