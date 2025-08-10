"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const contributions_1 = __importDefault(require("./routes/contributions"));
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "*",
}));
app;
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/savings-app";
// Connect to MongoDB
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
// Simple test route
app.get("/", (req, res) => {
    res.send("Savings App Backend Running");
});
app.use("/api", auth_1.default);
app.use("/api/contributions", contributions_1.default);
app.use("/api/users", user_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
