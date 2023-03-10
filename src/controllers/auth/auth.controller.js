const userService = require("../../services/user/user.service");

async function login(req, res) {
    const { login, password } = req.body;

    try {
        const updateUser = await userService.checkAuth(login, password);
    } catch (err) {
        res.status(404).send({
            message: err.message,
            code: 404
        });
    }
}

async function register(req, res, next) {
    const { firstName, lastName, avatar = null, login, password } = req.body;

    try {
        const newUser = await userService.registerUser(
            firstName,
            lastName,
            avatar,
            login,
            password
        );

        res.json(newUser);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    login,
    register
}