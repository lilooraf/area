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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = exports.getEvents = exports.createEvent = exports.sendMail = exports.getMail = void 0;
var axios_1 = __importDefault(require("axios"));
var getMail = function (access_token) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default('https://graph.microsoft.com/v1.0/me/messages', {
                    method: 'GET',
                    headers: { 'Authorization': "Bearer " + access_token, 'outlook.body-content-type': 'text' }
                })
                    .then(function (response) { return { success: true, data: response }; })
                    .catch(function (error) { return { success: false, error: error }; })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getMail = getMail;
var sendMail = function (access_token, receiver, subject, message) { return __awaiter(void 0, void 0, void 0, function () {
    var sendMail;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sendMail = {
                    message: {
                        subject: subject,
                        body: {
                            contentType: "Text",
                            content: message
                        },
                        toRecipients: [
                            {
                                emailAddress: {
                                    address: receiver
                                }
                            }
                        ],
                    },
                };
                return [4 /*yield*/, axios_1.default('https://graph.microsoft.com/v1.0/me/sendMail', {
                        method: 'POST',
                        headers: {
                            'Authorization': "Bearer " + access_token,
                            'Content-Type': 'application/json'
                        },
                        data: {
                            'message': sendMail
                        }
                    })
                        .then(function (response) { return { success: true, data: response }; })
                        .catch(function (error) { return { success: false, error: error }; })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.sendMail = sendMail;
var createEvent = function (access_token, content, start, end, subject) { return __awaiter(void 0, void 0, void 0, function () {
    var event;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event = {
                    subject: subject,
                    body: {
                        contentType: "HTML",
                        content: content
                    },
                    start: {
                        dateTime: start,
                        timeZone: "Pacific Standard Time"
                    },
                    end: {
                        dateTime: end,
                        timeZone: "Pacific Standard Time"
                    },
                };
                return [4 /*yield*/, axios_1.default('https://graph.microsoft.com/v1.0/me/calendar/events', {
                        method: 'POST',
                        headers: {
                            'Authorization': "Bearer " + access_token,
                            'Content-Type': 'application/json'
                        },
                        data: event
                    })
                        .then(function (response) { return { success: true, data: response }; })
                        .catch(function (error) { return { success: false, error: error }; })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createEvent = createEvent;
var getEvents = function (access_token) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default('https://graph.microsoft.com/v1.0/me/calendar/events', {
                    method: 'GET',
                    headers: {
                        'Authorization': "Bearer " + access_token
                    },
                })
                    .then(function (response) { return { success: true, data: response }; })
                    .catch(function (error) { return { success: false, error: error }; })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getEvents = getEvents;
var createNote = function (access_token, name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default('https://graph.microsoft.com/v1.0/me/onenote/notebooks', {
                    method: 'GET',
                    headers: {
                        'Authorization': "Bearer " + access_token,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        'displayName': name
                    }
                })
                    .then(function (response) { return { success: true, data: response }; })
                    .catch(function (error) { return { success: false, error: error }; })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createNote = createNote;
