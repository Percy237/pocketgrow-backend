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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContribution = exports.updateContribution = exports.getContributionsByUser = exports.getAllContributions = exports.addContribution = void 0;
const Contribution_1 = require("../models/Contribution");
const mongoose_1 = require("mongoose");
const User_1 = require("../models/User");
const addContribution = (userId, amount, date) => __awaiter(void 0, void 0, void 0, function* () {
    const contribution = new Contribution_1.Contribution({
        userId: new mongoose_1.Types.ObjectId(userId),
        amount,
        date,
    });
    const updatedUser = yield User_1.User.findByIdAndUpdate(userId, {
        $inc: { totalSavings: amount },
        $set: { lastContribution: date },
    }, { new: true });
    yield contribution.save();
    return contribution;
});
exports.addContribution = addContribution;
const getAllContributions = () => __awaiter(void 0, void 0, void 0, function* () {
    return Contribution_1.Contribution.find()
        .populate("userId", "name email role")
        .sort({ date: -1 });
});
exports.getAllContributions = getAllContributions;
const getContributionsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return Contribution_1.Contribution.find({ userId: new mongoose_1.Types.ObjectId(userId) }).sort({
        date: -1,
    });
});
exports.getContributionsByUser = getContributionsByUser;
const updateContribution = (id, amount, date) => __awaiter(void 0, void 0, void 0, function* () {
    return Contribution_1.Contribution.findByIdAndUpdate(id, { amount, date }, { new: true });
});
exports.updateContribution = updateContribution;
const deleteContribution = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Contribution_1.Contribution.findByIdAndDelete(id);
});
exports.deleteContribution = deleteContribution;
