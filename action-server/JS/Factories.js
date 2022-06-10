"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factories = void 0;
var Spotify_1 = require("./Factory/Spotify");
var Youtube_1 = require("./Factory/Youtube");
var Intranet_1 = require("./Factory/Intranet");
var MovieDB_1 = require("./Factory/MovieDB");
var Microsoft_1 = require("./Factory/Microsoft");
var Factories = /** @class */ (function () {
    function Factories() {
        this._factories = new Map([
            ['Spotify', new Spotify_1.Spotify()],
            ['Youtube', new Youtube_1.Youtube()],
            ['Intranet', new Intranet_1.Intranet()],
            ['Moviedb', new MovieDB_1.MovieDB()],
            ['Microsoft', new Microsoft_1.Microsoft()]
        ]);
    }
    Factories.prototype.getFactories = function () {
        return this._factories;
    };
    return Factories;
}());
exports.Factories = Factories;
