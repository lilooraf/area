
const api = require('./spotify');

module.exports = class SpotifyImpl {
    createActionList() {
        return {
            get_user_profile: api.getUserProfile,
            get_playlist_items: api.getPlaylistItems
        };
    }
}
