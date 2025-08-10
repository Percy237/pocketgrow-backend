"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
        return res
            .status(401)
            .json({ message: "No token provided", success: false });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res
            .status(403)
            .json({ message: "Invalid or expired token", success: false });
    }
};
exports.authenticateJWT = authenticateJWT;
const authorizeRoles = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
    if (!roles.includes(req.user.role)) {
        return res
            .status(403)
            .json({ message: "Forbidden: Insufficient role", success: false });
    }
    next();
};
exports.authorizeRoles = authorizeRoles;
