"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Likes = void 0;
var Likes = /** @class */ (function () {
    function Likes() {
    }
    Likes.prototype.watchAction = function () {
        return { success: true, type: "Likes" };
    };
    return Likes;
}());
exports.Likes = Likes;
