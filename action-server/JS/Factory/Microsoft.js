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
exports.Microsoft = void 0;
var MicrosoftActionImpl = __importStar(require("../WatchAction/Microsoft"));
var MicrosoftReactionImpl = __importStar(require("../Reaction/Microsoft"));
var Microsoft = /** @class */ (function () {
    function Microsoft() {
    }
    Microsoft.prototype.createWatchAction = function (services) {
        var list = new Map([
            ['get_mail', new MicrosoftActionImpl.GetMail()],
            ['get_events', new MicrosoftActionImpl.GetEvents()]
        ]);
        var action = list.get(services);
        return action;
    };
    Microsoft.prototype.createReaction = function (services) {
        var list = new Map([
            ['send_mail', new MicrosoftReactionImpl.SendMail()],
            ['create_note', new MicrosoftReactionImpl.CreateNote()],
            ['create_event', new MicrosoftReactionImpl.CreateEvent()]
        ]);
        var reaction = list.get(services);
        return reaction;
    };
    return Microsoft;
}());
exports.Microsoft = Microsoft;
