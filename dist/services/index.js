"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesService = exports.API_TIMEOUT_MS = exports.EXPRESS_API_URL = exports.ONLINE_API_URL = exports.LOCAL_API_URL = void 0;
exports.LOCAL_API_URL = process.env.REACT_APP_LOCAL_API_URL;
exports.ONLINE_API_URL = process.env.REACT_APP_ONLINE_API_URL;
exports.EXPRESS_API_URL = process.env.REACT_APP_EXPRESS_API_URL;
exports.API_TIMEOUT_MS = 0;
var BranchesService_1 = require("./BranchesService");
Object.defineProperty(exports, "BranchesService", { enumerable: true, get: function () { return __importDefault(BranchesService_1).default; } });
