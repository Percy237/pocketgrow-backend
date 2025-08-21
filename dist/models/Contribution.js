"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contribution = void 0;
const mongoose_1 = require("mongoose");
const contributionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
}, { timestamps: true });
exports.Contribution = (0, mongoose_1.model)("Contribution", contributionSchema);
