import { IReaction } from "../Reaction/IReaction";
import { IWatchAction } from "../WatchAction/IWatchAction";
import { IServiceFactory } from "./IServiceFactory";
import * as SpotifyReactionImpl from "../Reaction/Spotify";
import * as SpotifyActionImpl from "../WatchAction/Spotify";

export class Spotify implements IServiceFactory {
    public createWatchAction(services: string): IWatchAction {
        const list: Map<string, IWatchAction> = new Map([
            ['get_user_profile', new SpotifyActionImpl.UserProfileUpdated()],
            ['get_playlist_items', new SpotifyActionImpl.PlaylistItemsUpdated()],
            ['search_tracks', new SpotifyActionImpl.SearchTracks()]
        ]);

        const action: any = list.get(services);
        return action;
    }

    public createReaction(services: string): IReaction {
        const list: Map<string, IReaction> = new Map([
            ['create_playlist', new SpotifyReactionImpl.CreatePlaylist()],
            ['add_items_playlist', new SpotifyReactionImpl.AddItemsPlaylist()],
        ]);

        const reaction: any = list.get(services);
        return reaction;
    }
}