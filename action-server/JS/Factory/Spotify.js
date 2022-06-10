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
exports.Spotify = void 0;
var SpotifyReactionImpl = __importStar(require("../Reaction/Spotify"));
var SpotifyActionImpl = __importStar(require("../WatchAction/Spotify"));
var Spotify = /** @class */ (function () {
    function Spotify() {
    }
    Spotify.prototype.createWatchAction = function (services) {
        var list = new Map([
            ['get_user_profile', new SpotifyActionImpl.UserProfileUpdated()],
            ['get_playlist_items', new SpotifyActionImpl.PlaylistItemsUpdated()],
            ['search_tracks', new SpotifyActionImpl.SearchTracks()]
        ]);
        var action = list.get(services);
        return action;
    };
    Spotify.prototype.createReaction = function (services) {
        var list = new Map([
            ['create_playlist', new SpotifyReactionImpl.CreatePlaylist()],
            ['add_items_playlist', new SpotifyReactionImpl.AddItemsPlaylist()],
        ]);
        var reaction = list.get(services);
        return reaction;
    };
    return Spotify;
}());
exports.Spotify = Spotify;
