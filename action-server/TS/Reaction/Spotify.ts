import { IReaction } from "./IReaction";
import Firebase from '../Firebase/Firebase';
import * as api from '../ServicesApiRequests/Spotify';

export class CreatePlaylist implements IReaction {
    public async doReaction(userUid: string, resultOfTheAction: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Spotify');
        const playlistTitle: String = resultOfTheAction.title;
        const playlistDescription: String = resultOfTheAction.description;

        return await api.createPlaylist(access_token, playlistTitle, playlistDescription);
    }
}

export class AddItemsPlaylist implements IReaction {
    public async doReaction(userUid: string, resultOfTheAction: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Spotify');
        const playlistID: String = resultOfTheAction.playlist;
        const tracksURI: String = resultOfTheAction.tracks;

        return await api.addItemsPlaylist(access_token, playlistID, tracksURI);
    }
}
