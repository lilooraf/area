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
exports.notificationCheck = exports._check_new_activities_register = exports._check_new_activities = exports._activityObjectFormater = exports._messageObjectFormater = void 0;
var axios_1 = __importDefault(require("axios"));
var getPlanningRequest = function (autolog, start, end) { return __awaiter(void 0, void 0, void 0, function () {
    var request;
    return __generator(this, function (_a) {
        request = "https://intra.epitech.eu/" + autolog + "/planning/load?format=json&start=" + start + "&end=" + end;
        return [2 /*return*/, axios_1.default.get(request)
                .then(function (res) { return res; })
                .catch(function (error) { return error; })];
    });
}); };
var getNotificationRequest = function (autolog, message_type) { return __awaiter(void 0, void 0, void 0, function () {
    var request;
    return __generator(this, function (_a) {
        request = "https://intra.epitech.eu/" + autolog + "/user/notification/" + message_type + "?format=json";
        return [2 /*return*/, axios_1.default.get(request)
                .then(function (res) { return res; })
                .catch(function (error) { return error; })];
    });
}); };
////////////////////////////////////////////////
// HERE Function that format message in better format
////////////////////////////////////////////////
var _messageObjectFormater = function (message) {
    return {
        title: message.title,
        id: message.id,
        class: message.class
    };
};
exports._messageObjectFormater = _messageObjectFormater;
////////////////////////////////////////////////
// HERE Function that format activities in our own format
////////////////////////////////////////////////
var _activityObjectFormater = function (activity) {
    return {
        title: activity.acti_title,
        isRegister: activity.event_registered,
        start: activity.allowed_planning_start,
        begin: activity.allowed_planning_end,
        module_code: activity.codemodule,
        module_title: activity.titlemodule,
        isRegisterModule: activity.module_registered,
        id: activity.codeacti
    };
};
exports._activityObjectFormater = _activityObjectFormater;
////////////////////////////////////////////////
// HERE Function that catch new activities on intranet
////////////////////////////////////////////////
var _check_new_activities = function (autolog, start, end) { return __awaiter(void 0, void 0, void 0, function () {
    var res, activity_array;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getPlanningRequest(autolog, start, end)];
            case 1:
                res = _a.sent();
                activity_array = [];
                // all planing event is in res.data[] (Array) ONLY MODULE YOU ARE REGISTER
                res.data.map(function (item) {
                    if (item.module_registered === false)
                        return;
                    activity_array.push(exports._activityObjectFormater(item));
                });
                return [2 /*return*/, { success: true, data: activity_array }];
        }
    });
}); };
exports._check_new_activities = _check_new_activities;
////////////////////////////////////////////////
// HERE Function that catch new event register
////////////////////////////////////////////////
var _check_new_activities_register = function (autolog, start, end) { return __awaiter(void 0, void 0, void 0, function () {
    var res, activity_array;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getPlanningRequest(autolog, start, end)];
            case 1:
                res = _a.sent();
                activity_array = [];
                // all planing event is in res.data[] (Array) ONLY ACTIVITIES YOU ARE REGISTER
                res.data.map(function (item) {
                    if (item.event_registered !== "registered")
                        return;
                    activity_array.push(exports._activityObjectFormater(item));
                });
                return [2 /*return*/, { success: true, data: activity_array }];
        }
    });
}); };
exports._check_new_activities_register = _check_new_activities_register;
////////////////////////////////////////////////
// HERE Function that catch new event register
////////////////////////////////////////////////
var notificationCheck = function (autolog) { return __awaiter(void 0, void 0, void 0, function () {
    var res, arr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getNotificationRequest(autolog, "message")];
            case 1:
                res = _a.sent();
                arr = res.data.map(function (item) { return exports._messageObjectFormater(item); });
                return [2 /*return*/, { success: true, data: arr }];
        }
    });
}); };
exports.notificationCheck = notificationCheck;
