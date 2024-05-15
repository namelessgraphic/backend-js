const { where } = require('sequelize');
const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req,res) => {
    try {
        const users = await User.findAll();

        if (users.length == 0) {
            res.status(404).json({ message: 'There are no users!' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ 
            firstName, 
            lastName,
            email,
            password: hashedPassword,
        });

        res.status(200).json({ message: 'User created!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUserById = async (req,res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { firstName, lastName, email, password } = req.body;

        const hashedPassword = hash(password);

        await User.update(
            { firstName, lastName, email, password: hashedPassword },
            { where: { id: userId } }
        );

        res.status(200).json({ message: 'User updated!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.destroyUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        await User.destroy({where: {id: userId,},});
        res.status(200).json({ message: 'User deleted!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}