"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User_1.User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    const newUser = new User_1.User({ name, email, passwordHash });
    yield newUser.save();
    return newUser;
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ email });
    if (!user)
        throw new Error("Invalid credentials");
    const isValid = yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!isValid)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "1d",
    });
    return { token, user };
});
exports.loginUser = loginUser;
