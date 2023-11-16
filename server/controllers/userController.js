const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {  

    try {

        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: 'Username already used', status: false });

        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: 'Email already used', status: false });

        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });
        delete user.password;

        return res.json({ status: true, user })
    } catch (err) {
        next(err);
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user)
            return res.json({ msg: 'Nom d\'utilisateur ou mot de passe incorrect', status: false });

        const isPaasswordValid = await bcrypt.compare(password, user.password);
        if (!isPaasswordValid)
            return res.json({ msg: 'Nom d\'utilisateur ou mot de passe incorrect', status: false });

        delete user.password;
        return res.json({ status: true, user })
    } catch (err) {
        next(err);
    }
};


module.exports.setProfil = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const profilImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isProfilImageSet: true,
            profilImage,
        });
        returnres.json({ isSet: userData.isProfilImageSet, image: userData.profilImage })
    } catch (err) {
        next(err)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: req.params.id }).select([
            "username",
            "email",
            "profilImage",
            '_id',
        ]);
    } catch (err) {

    }
}