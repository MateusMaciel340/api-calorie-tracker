const userService = require("../../services/user/user.service");

async function getAuthUser(req, res, next) {
    const [_, token] = req.headers.authorization.split(" ");
    const user = await userService.getUserByToken(token);

    delete user.access_token;
    delete user.password;

    res.json(user);
}

async function updateAuthUser(req, res, next) {
    const [_, token] = req.headers.authorization.split(" ");
    const {
        first_name,
        last_name,
        avatar,
        monthly_budget_limit,
        daily_calorie_limit
    } = req.body;

    try {
        const updatedUser = await userService.updateUserByToken(token, {
            first_name,
            last_name,
            avatar,
            monthly_budget_limit,
            daily_calorie_limit
        });

        delete updatedUser.access_token;
        delete updatedUser.password;

        res.json(updatedUser);

    } catch (err) {
        next(err);
    }
}

async function checkCalorieLimit(req, res, next) {
    try {
        const { startDate, endDate } = req.body;
        const result = await userService.checkCalorieLimit({
            userId: req.user.id,
            startDate,
            endDate
        });

        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function checkBudgetLimit(req, res, next) {
    try {
        const result = await userService.checkBudgetLimit(req.user.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAuthUser,
    updateAuthUser,
    checkCalorieLimit,
    checkBudgetLimit
}