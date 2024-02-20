const User = require('../models/user-model');
const { verifyToken } = require('../utils/token');

exports.authenticate = async (req, res, next) => {
    try {
        console.log(req.header('Authorization'));
        const token = req.header('Authorization');

        if (!token) {
            return res.status(403).send('User not authorized');
        }
        const { userId } = verifyToken(token);
         const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).send('Internal server error')
    }
}