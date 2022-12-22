const userService = require("../services/user/user.service");

async function auth(req, res, next) {
    const { originalUrl } = req;

    if (
        originalUrl === "/" ||
        originalUrl === "/login" ||
        originalUrl === "/register"
    ) {
        next();
        return;
    }

    const authorization = req.headers.authorization;

    if (authorization == null) {
        res.status(401).send({
            message: "Unauthorized",
            code: 401
        });

        return;
    }

    const [bearer, token] = authorization.split(" ");
    const user = await userService.getUserByToken(token);

    if (user) {
        req.user = {
            id: user.id,
            role: user.role
        };

        next();
    } else {
        res.status(401).send({
            message: "Unauthorized",
            code: 401
        });
    }
}

module.exports = auth;