import { isEqual, isEmpty } from 'lodash';

import { IWatchAction } from "./IWatchAction";
import Firebase from '../Firebase/Firebase';
import * as api from '../ServicesApiRequests/Spotify';

export class UserProfileUpdated implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Spotify');
        const { success, data }: any = await api.getUserProfile(access_token);
        const userProfileSnapshot: any = await firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(userProfileSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, userProfileSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}

export class PlaylistItemsUpdated implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Spotify');
        const playlistID: String = infoAction.playlistID;
        const { success, data }: any = await api.getPlaylistItems(access_token, playlistID);
        const playlistItemsSnapshot: any = firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(playlistItemsSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, playlistItemsSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}

export class SearchTracks implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Spotify');
        const query: String = infoAction.query;
        const { success, data }: any = await api.searchTrack(access_token, query);
        const tracksSnapshot: any = firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(tracksSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, tracksSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}
