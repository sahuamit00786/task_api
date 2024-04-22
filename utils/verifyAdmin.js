import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    // console.log(authorizationHeader);
    
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).send('Invalid token');
    }

    const token = authorizationHeader.split(' ')[1];
    // console.log(token);

    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if (err) {
            // console.log('JWT Verification Error:', err);
            return res.status(401).send('Unauthorized',err);
        }
        
        if (!user.isAdmin) {
            return res.status(401).send('Unauthorized');
        }
        req.user = user;
        // console.log(req.user);
        next();
    });
};
