"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = async (payload, secretOrPrivateKey, time, algorithm = 'RS256') => new Promise((resolve, rejects) => {
    jsonwebtoken_1.default.sign(payload, secretOrPrivateKey, { expiresIn: time, algorithm }, (error, token) => {
        if (error) {
            rejects(error);
            return;
        }
        resolve(token);
    });
});
exports.generateToken = generateToken;
const verifyToken = async (token, secretOrPublicKey, algorithms = ['RS256']) => new Promise((resolve, rejects) => {
    jsonwebtoken_1.default.verify(token, secretOrPublicKey, { algorithms }, (error, payload) => {
        if (error) {
            rejects(error);
            return;
        }
        resolve(payload);
    });
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=async-jwt.util.js.map