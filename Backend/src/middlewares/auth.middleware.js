const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === "production" ? null : "dev_jwt_secret_key_12345");

async function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token is invalid."
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        req.user = decoded

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid or expired token."
        })
    }

}

module.exports = { authUser }
