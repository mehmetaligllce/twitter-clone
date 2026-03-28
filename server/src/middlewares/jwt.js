import jwt from 'jsonwebtoken';

export const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_key, { expiresIn: '7d' });
}

export const authenticateToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token)
        return res.status(401).json({message:'Giriş bulunamadı!'});
    try{
        const verify=jwt.verify(token,process.env.JWT_key);
        req.user=verify;
        next();
    }
    catch(err)
    {
        return res.status(401).json({message:'Hatalı giriş!'})
    }
}