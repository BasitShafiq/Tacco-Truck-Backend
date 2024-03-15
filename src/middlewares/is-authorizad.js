import {findOne} from '../services/user.service.js'

const isAuthorized= (requiredRole)=>(req,res,next)=>{
    req.user= findOne('id',req.user.userId);
    
    if (req.user && req.user.role === requiredRole ) {
        // User is authorized, proceed to the next middleware or route handler
        next();
      } else {
        // User is not authorized, return a 403 Forbidden response
        res.status(403).json({ message: 'Forbidden: You are not authorized to access this resource' });
      }

}

export {
    isAuthorized
}