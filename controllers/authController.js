const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const secretKey = 'f30e83891f1db5289bea6ccf60b5ea26661edb81b611b401ddf4f4088f3d58ad';
const bcrypt = require('bcrypt');

exports.authAccess = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        if (!email || !password) {
            return res.status(404).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email: email } });
        
        if (!user) {
            return res.status(404).json({ message: 'The user with this email does not exist in our records' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({user} , secretKey, { expiresIn: "1h" });
            return res.status(200).json({message: 'Token created successfully', token});
        } else {
            return res.status(401).json({ message: 'The password provided is incorrect' });
        }

    } catch (error) {
        return res.status(500).json({ message: 'There was an error on the server' });
    }
}