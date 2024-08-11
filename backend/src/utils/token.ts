import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config';
import { NextFunction, Response,Request} from 'express';
export class Token{

    static createToken(payload:object):string{
        return jwt.sign(payload,JWT_SECRET_KEY , {expiresIn:'1h'})
    }
    static checkToken(token:string){
        let isverify = jwt.verify(token,JWT_SECRET_KEY);
        return isverify;
    }

}

export interface RequestAuth extends Request{
    user?:string;
}



export const checkAuth = (req: RequestAuth, res: Response, next: NextFunction): void => {
    
    let headers = req.headers as (typeof req.headers &{token:string} )
    if(headers.token){
        try{

            let payload = Token.checkToken(headers.token);
            if(payload){
                req.user = payload as string;
                next();
            }else{
                res.status(401).send({msg:'Unauthorized'});
            }
        }catch(err:any){
            res.status(401).send({msg:'Unauthorized'});
        }
      
    }else{
        res.status(401).send({msg:'Unauthorized'});
    }
}