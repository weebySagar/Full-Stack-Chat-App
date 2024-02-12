const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
exports.generateToken=(userId)=>{
    const token = jwt.sign({userId},secretKey);
    return token
}

exports.verifyToken=(token)=>{
    try {
        const decoded = jwt.verify(token,secretKey)
        return decoded;
    } catch (error) {
        return null;
    }
}