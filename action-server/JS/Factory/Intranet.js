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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intranet = void 0;
var IntranetActionImpl = __importStar(require("../WatchAction/Intranet"));
var Intranet = /** @class */ (function () {
    function Intranet() {
    }
    Intranet.prototype.createWatchAction = function (sevices) {
        var list = new Map([
            ['get_new_activities', new IntranetActionImpl.getNewActivities()],
            ['get_new_activities_register', new IntranetActionImpl.getNewActivitiesRegister()],
            ['get_notification', new IntranetActionImpl.getNotification()]
        ]);
        var action = list.get(sevices);
        return action;
    };
    Intranet.prototype.createReaction = function (sevices) {
        return undefined;
    };
    return Intranet;
}());
exports.Intranet = Intranet;
