const db = require("../../services/db.service");

const QUERY_USERS = ``;
const QUERY_USER_BY_ID = ``;
const QUERY_USER_FOODS_BY_ID = ``;
const QUERY_WEEKLY_FOOD_ENTRIES_COUNT = ``;
const QUERY_AVERAGE_CALORIES_PER_USER_FOR_LAST_WEEK = ``;

async function findAllUsers() {
    const result = await db.query(QUERY_USERS);
    return {
        count: result.rowCount,
        data: result.row
    };
}

async function findUser(userId) {
    const result = await db.queryParams(QUERY_USER_BY_ID, [userId]);
    return result.rows[0];
}

async function findUserFoods(userId) {
    const result = await db.queryParams(QUERY_USER_FOODS_BY_ID, [userId]);
    return {
        count: result.rowCount,
        data: result.rows
    }
}

async function calcWeeklyFoodEntriesCount(startDate) {
    const result = await db.queryParams(QUERY_WEEKLY_FOOD_ENTRIES_COUNT, [
        startDate
    ]);

    return result.rows[0];
}

async function calcAverageCaloriesPerUserForLastWeek() {
    const result = await db.queryParams(
        QUERY_AVERAGE_CALORIES_PER_USER_FOR_LAST_WEEK
    );

    return {
        count: result.rowCount,
        data: result.rows
    }
}

module.exports = {
    findAllUsers,
    findUser,
    findUserFoods,
    calcWeeklyFoodEntriesCount,
    calcAverageCaloriesPerUserForLastWeek
}