import jwt from'jsonwebtoken';

const userMiddleware = (req, res, next) => {
    const token = req.header('tokenInput');
    console.log(token)
    if (!token) return res.status(401).json({ message: 'No token found, authorization failed' });

    try {
        const verifytoken = jwt.verify(token, "rahulmalviya");
        req.user =verifytoken;
        console.log(verifytoken)
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default userMiddleware;
