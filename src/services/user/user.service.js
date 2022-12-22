const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const dayjs = require("dayjs");
const { BYCRIPT_SALT } = require("../../utils/consts");

const userRepository = require("../../repositories/user/user.repository");
const { isNone } = require("../../utils/helpers");

async function getUserByToken(token) {
    return userRepository.findUserByToken(token);
}

async function getUserById(id) {
    return userRepository.findUserById(id);
}

async function updateUserByToken(token, data) {
    return userRepository.updateUserByToken(token, data);
}

async function checkAuth(login, password) {
    const user = await userRepository.findUserByLogin(login);

    if (!user) {
        throw Error("User is not found!");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Username or password is wrong");
    }

    const accessToken = uuidv4();
    const updatedUser = await userRepository.updateUserTokenById(
        user.id,
        accessToken
    );

    delete updatedUser.password;
    return updatedUser;
}

async function registerUser(firstName, lastName, avatar, login, password) {
    const passwordHash = await bcrypt.hash(password, BYCRIPT_SALT);
    const token = uuidv4();

    const newUser = await userRepository.saveUser(
        firstName,
        lastName,
        avatar,
        login,
        passwordHash,
        token
    );

    delete newUser.password;
    return newUser;
}

module.exports = {
    getUserById,
    getUserByToken,
    updateUserByToken,
    checkAuth,
    registerUser
}