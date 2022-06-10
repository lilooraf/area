"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebase = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
require("firebase/auth");
var initializeFirebase = function () {
    var firebaseConfig = {
        apiKey: 'AIzaSyCSUakAVSpaKLwzoQCjKN-HkwegyYT8A4Q',
        authDomain: 'area-c11d8.firebaseapp.com',
        projectId: 'area-c11d8',
        storageBucket: 'area-c11d8.appspot.com',
        messagingSenderId: '726354417175',
        appId: '1:726354417175:web:4f295eb7f692e5f22eee52',
        measurementId: 'G-DVSQDYCGWS'
    };
    app_1.default.initializeApp(firebaseConfig);
    app_1.default.firestore();
    return app_1.default;
};
initializeFirebase();
var getFirebase = function () { return app_1.default; };
exports.getFirebase = getFirebase;
