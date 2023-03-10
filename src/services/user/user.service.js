const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const dayjs = require("dayjs");
const { BYCRIPT_SALT } = require("../../utils/consts");

const userRepository = require("../../repositories/user/user.repository");
const foodsRepository = require("../../repositories/food/foods.repository");
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


async function checkCalorieLimit({ userId, startDate, endDate }) {
    const DEFAULT_START_DATE = dayjs().startOf("D").format();
    const DEFAULT_END_DATE = dayjs().format();

    const result = await foodsRepository.getUserTotalCaloriesByDate({
        userId,
        startDate: !isNone(startDate) ? startDate : DEFAULT_START_DATE,
        endDate: !isNone(endDate) ? endDate : DEFAULT_END_DATE,
    });

    return result;
}

async function checkBudgetLimit(userId) {
    const result = await foodsRepository.getUserMonthySpendings(userId);
    return result;
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
    checkCalorieLimit,
    checkBudgetLimit,
    checkAuth,
    registerUser
}